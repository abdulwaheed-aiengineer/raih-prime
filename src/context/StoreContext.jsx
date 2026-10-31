import React, { createContext, useContext, useState, useEffect } from 'react';
import productsData from '../data/products.json';
import { COMPANY_INFO, generateOrderId } from '../utils/helpers';
import { fireConfetti } from '../utils/confetti';

const StoreContext = createContext();

export function StoreProvider({ children }) {
  // Navigation & Views
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [sortBy, setSortBy] = useState('featured');
  const [onlyInStock, setOnlyInStock] = useState(false);

  // Modals & Drawers
  const [selectedProductModal, setSelectedProductModal] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  // Promo Code
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  // Notification Toasts
  const [toasts, setToasts] = useState([]);

  // Local Storage initialization
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('raih_prime_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('raih_prime_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('raih_prime_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('raih_prime_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('raih_prime_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('raih_prime_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  // Toast Helper
  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart operations
  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, product.inventory || 99) }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    addToast(`Added "${product.title.substring(0, 32)}..." to cart!`, 'cart');
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    addToast('Item removed from cart', 'info');
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const toggleWishlist = (product) => {
    const isSaved = wishlist.some((id) => id === product.id);
    if (isSaved) {
      setWishlist((prev) => prev.filter((id) => id !== product.id));
      addToast(`Removed "${product.title.substring(0, 28)}..." from wishlist`, 'info');
    } else {
      setWishlist((prev) => [...prev, product.id]);
      addToast(`Saved "${product.title.substring(0, 28)}..." to wishlist!`, 'heart');
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.includes(productId);
  };

  // Promo operations
  const applyPromoCode = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'RAIHPRIME') {
      setDiscountPercent(15);
      setPromoCode('RAIHPRIME');
      addToast('Promo code applied: 15% OFF your order!', 'success');
      return true;
    } else if (cleanCode === 'WELCOME10') {
      setDiscountPercent(10);
      setPromoCode('WELCOME10');
      addToast('Promo code applied: 10% OFF welcome bonus!', 'success');
      return true;
    } else if (cleanCode === 'MDLOCAL') {
      setDiscountPercent(20);
      setPromoCode('MDLOCAL');
      addToast('Parkville, MD neighbor code applied: 20% OFF!', 'success');
      return true;
    } else {
      addToast('Invalid promo code. Try "RAIHPRIME" or "WELCOME10"', 'error');
      return false;
    }
  };

  const removePromoCode = () => {
    setPromoCode('');
    setDiscountPercent(0);
    addToast('Promo code removed', 'info');
  };

  // Calculations
  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const cartTotalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const discountAmount = (cartSubtotal * discountPercent) / 100;
  const subtotalAfterDiscount = Math.max(0, cartSubtotal - discountAmount);
  const freeShippingDelta = Math.max(0, COMPANY_INFO.freeShippingThreshold - subtotalAfterDiscount);
  const isFreeShipping = subtotalAfterDiscount >= COMPANY_INFO.freeShippingThreshold;

  // Checkout & Order Placement
  const placeOrder = (orderPayload) => {
    const orderId = generateOrderId();
    const newOrder = {
      id: orderId,
      date: new Date().toISOString(),
      items: [...cart],
      subtotal: cartSubtotal,
      discount: discountAmount,
      promoCode: promoCode || null,
      shipping: orderPayload.shippingCost || 0,
      shippingMethod: orderPayload.shippingMethod || 'Standard Shipping',
      tax: orderPayload.tax || 0,
      total: orderPayload.total,
      customer: orderPayload.customer,
      status: 'Processing',
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      }),
      trackingTimeline: [
        { status: 'Order Placed', time: 'Just now', completed: true },
        { status: 'Processing at Parkville, MD Facility', time: 'In Progress', completed: true },
        { status: 'Handed to Carrier (USPS/UPS)', time: 'Pending', completed: false },
        { status: 'Out for Delivery', time: 'Pending', completed: false },
        { status: 'Delivered', time: 'Pending', completed: false },
      ]
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCompletedOrder(newOrder);
    clearCart();
    setIsCheckoutOpen(false);
    fireConfetti();
    addToast(`Order ${orderId} confirmed successfully!`, 'success');
    return newOrder;
  };

  // Filtered Products Logic
  const allCategories = ['All', ...new Set(productsData.map((p) => p.category))];
  const allBrands = [...new Set(productsData.map((p) => p.brand))].sort();
  const allTags = [...new Set(productsData.flatMap((p) => p.tags || []))].sort();

  const filteredProducts = productsData.filter((p) => {
    // Category
    if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
    
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchBrand = p.brand.toLowerCase().includes(q);
      const matchCategory = p.category.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchTags = p.tags && p.tags.some(t => t.toLowerCase().includes(q));
      if (!matchTitle && !matchBrand && !matchCategory && !matchDesc && !matchTags) return false;
    }

    // Brands
    if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) return false;

    // Tags
    if (selectedTags.length > 0) {
      const hasTag = selectedTags.every((tag) => (p.tags || []).includes(tag));
      if (!hasTag) return false;
    }

    // Price
    if (p.price < priceRange[0] || p.price > priceRange[1]) return false;

    // In Stock
    if (onlyInStock && !p.inStock) return false;

    return true;
  });

  // Sort
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'reviews') return b.reviewCount - a.reviewCount;
    if (sortBy === 'name-asc') return a.title.localeCompare(b.title);
    // featured
    return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
  });

  return (
    <StoreContext.Provider
      value={{
        products: productsData,
        filteredProducts: sortedProducts,
        totalCatalogCount: productsData.length,
        activeTab,
        setActiveTab,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        selectedTags,
        setSelectedTags,
        selectedBrands,
        setSelectedBrands,
        priceRange,
        setPriceRange,
        sortBy,
        setSortBy,
        onlyInStock,
        setOnlyInStock,
        allCategories,
        allBrands,
        allTags,
        
        // Modals
        selectedProductModal,
        setSelectedProductModal,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isOrderTrackingOpen,
        setIsOrderTrackingOpen,
        completedOrder,
        setCompletedOrder,

        // Cart & Wishlist
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartSubtotal,
        cartTotalItems,
        wishlist,
        toggleWishlist,
        isInWishlist,

        // Promo
        promoCode,
        discountPercent,
        discountAmount,
        subtotalAfterDiscount,
        applyPromoCode,
        removePromoCode,
        freeShippingDelta,
        isFreeShipping,

        // Orders
        orders,
        placeOrder,

        // Toasts
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
