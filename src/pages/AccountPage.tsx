import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, Heart, MapPin, User, LogOut, Plus, Trash2, Check, Edit2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import SEO from '../components/SEO';
import productsData from '../data/products.json';
import type { Product, Address } from '../types';

const products = productsData as Product[];

type Tab = 'orders' | 'wishlist' | 'addresses' | 'profile';

const STATUS_COLORS: Record<string, string> = {
  'En cours': 'bg-amber-100 text-amber-800',
  'Expédié':  'bg-blue-100 text-blue-800',
  'Livré':    'bg-green-100 text-green-800',
};

export default function AccountPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, orders, addresses, addAddress, updateAddress, removeAddress, updateProfile } = useAuth();
  const { items: wishlistIds, toggle } = useWishlist();

  const [tab, setTab] = useState<Tab>('orders');

  // Profile form
  const [profileForm, setProfileForm] = useState({ firstName: user?.firstName || '', lastName: user?.lastName || '', email: user?.email || '', phone: user?.phone || '' });
  const [profileSaved, setProfileSaved] = useState(false);

  // Address form
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [addrForm, setAddrForm] = useState({ label: 'Domicile', firstName: user?.firstName || '', lastName: user?.lastName || '', phone: user?.phone || '', address: '', city: '', zip: '', isDefault: false });

  if (!isAuthenticated) {
    return (
      <main className="max-w-md mx-auto px-4 py-20 text-center">
        <p className="text-sm font-bold uppercase tracking-wide mb-2">Connexion requise</p>
        <p className="text-xs text-gray-500 mb-6">Connectez-vous pour accéder à votre espace personnel.</p>
        <Link to="/login" className="bg-black text-white px-6 py-3 text-[11px] font-black tracking-widest uppercase hover:bg-gray-800 transition-colors">
          Se connecter
        </Link>
      </main>
    );
  }

  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

  const TABS: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: 'orders', label: 'Mes Commandes', icon: <Package size={16} strokeWidth={1.5} /> },
    { key: 'wishlist', label: 'Mes Favoris', icon: <Heart size={16} strokeWidth={1.5} /> },
    { key: 'addresses', label: 'Adresses', icon: <MapPin size={16} strokeWidth={1.5} /> },
    { key: 'profile', label: 'Mon Profil', icon: <User size={16} strokeWidth={1.5} /> },
  ];

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAddress) {
      updateAddress(editingAddress.id, addrForm);
    } else {
      addAddress(addrForm);
    }
    setShowAddressForm(false);
    setEditingAddress(null);
    setAddrForm({ label: 'Domicile', firstName: user?.firstName || '', lastName: user?.lastName || '', phone: user?.phone || '', address: '', city: '', zip: '', isDefault: false });
  };

  const openEditAddress = (a: Address) => {
    setEditingAddress(a);
    setAddrForm({ label: a.label, firstName: a.firstName, lastName: a.lastName, phone: a.phone, address: a.address, city: a.city, zip: a.zip, isDefault: a.isDefault });
    setShowAddressForm(true);
  };

  const saveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(profileForm);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <SEO title="Mon Compte — MAC Cosmetics Maroc" description="" canonical="/account" />

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-[10px] font-black tracking-widest uppercase text-gray-400 mb-0.5">Bienvenue,</p>
          <h1 className="text-xl font-black uppercase tracking-tight">{user?.firstName} {user?.lastName}</h1>
        </div>
        <button
          onClick={() => { logout(); navigate('/'); }}
          className="flex items-center gap-2 text-[11px] font-black tracking-widest uppercase text-gray-500 hover:text-black transition-colors underline hover:no-underline"
        >
          <LogOut size={14} /> Se déconnecter
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 items-start">

        {/* Sidebar tabs */}
        <nav className="flex md:flex-col gap-1">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-3 px-4 py-3 text-[11px] font-black tracking-widest uppercase text-left transition-colors w-full ${tab === t.key ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              {t.icon}
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </nav>

        {/* Content */}
        <div>

          {/* ORDERS */}
          {tab === 'orders' && (
            <div>
              <h2 className="text-xs font-black tracking-widest uppercase mb-5 border-b border-gray-200 pb-3">
                Mes Commandes ({orders.length})
              </h2>
              {orders.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-gray-300">
                  <Package size={36} strokeWidth={1} className="mx-auto mb-3 text-gray-300" />
                  <p className="text-sm font-bold text-gray-500 mb-2">Aucune commande pour l'instant</p>
                  <Link to="/products" className="text-[11px] font-black tracking-widest uppercase underline hover:no-underline">
                    Commencer mes achats
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-gray-200 p-5">
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                        <div>
                          <p className="text-xs font-black tracking-widest uppercase">{order.id}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{order.date}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-[10px] font-black tracking-wide uppercase px-2 py-1 rounded-full ${STATUS_COLORS[order.status] || 'bg-gray-100 text-gray-600'}`}>
                            {order.status}
                          </span>
                          <span className="text-sm font-black">{order.total} MAD</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {order.items.map((item) => (
                          <div key={`${item.productId}-${item.shade?.id ?? '_'}`} className="w-10 h-10 bg-gray-50 overflow-hidden flex-shrink-0">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover"
                              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                          </div>
                        ))}
                        <div className="flex-1 min-w-0 ml-1 self-center">
                          <p className="text-xs text-gray-600">{order.items.map((i) => i.name).join(', ')}</p>
                          <p className="text-[11px] text-gray-400 mt-0.5">
                            {order.paymentMethod === 'card' ? 'Carte bancaire' : 'Contre remboursement'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* WISHLIST */}
          {tab === 'wishlist' && (
            <div>
              <h2 className="text-xs font-black tracking-widest uppercase mb-5 border-b border-gray-200 pb-3">
                Mes Favoris ({wishlistProducts.length})
              </h2>
              {wishlistProducts.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-gray-300">
                  <Heart size={36} strokeWidth={1} className="mx-auto mb-3 text-gray-300" />
                  <p className="text-sm font-bold text-gray-500 mb-2">Votre liste de favoris est vide</p>
                  <Link to="/products" className="text-[11px] font-black tracking-widest uppercase underline hover:no-underline">
                    Parcourir les produits
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {wishlistProducts.map((product) => (
                    <div key={product.id} className="group relative">
                      <Link to={`/products/${product.id}`} className="block">
                        <div className="aspect-square bg-gray-50 overflow-hidden">
                          <img src={product.image} alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                        </div>
                        <div className="pt-2">
                          <p className="text-[10px] text-gray-500 uppercase tracking-widest">{product.subcategory}</p>
                          <p className="text-xs font-bold mt-0.5 leading-snug group-hover:underline">{product.name}</p>
                          <p className="text-sm font-black mt-1">{product.price} MAD</p>
                        </div>
                      </Link>
                      <button
                        onClick={() => toggle(product.id)}
                        className="absolute top-2 right-2 w-7 h-7 bg-white flex items-center justify-center hover:bg-red-50 transition-colors"
                        aria-label="Retirer des favoris"
                      >
                        <Heart size={13} fill="black" className="text-black" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ADDRESSES */}
          {tab === 'addresses' && (
            <div>
              <div className="flex items-center justify-between mb-5 border-b border-gray-200 pb-3">
                <h2 className="text-xs font-black tracking-widest uppercase">Mes Adresses</h2>
                {!showAddressForm && (
                  <button
                    onClick={() => setShowAddressForm(true)}
                    className="flex items-center gap-1.5 text-[11px] font-black tracking-widest uppercase border border-black px-3 py-1.5 hover:bg-black hover:text-white transition-colors"
                  >
                    <Plus size={12} /> Ajouter
                  </button>
                )}
              </div>

              {showAddressForm ? (
                <form onSubmit={handleSaveAddress} className="border border-gray-200 p-6 space-y-4">
                  <p className="text-[10px] font-black tracking-widest uppercase text-gray-500">
                    {editingAddress ? 'Modifier l\'adresse' : 'Nouvelle adresse'}
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-black tracking-widest uppercase block mb-1.5">Prénom *</label>
                      <input required value={addrForm.firstName} onChange={(e) => setAddrForm((f) => ({ ...f, firstName: e.target.value }))}
                        className="w-full border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black" />
                    </div>
                    <div>
                      <label className="text-[10px] font-black tracking-widest uppercase block mb-1.5">Nom *</label>
                      <input required value={addrForm.lastName} onChange={(e) => setAddrForm((f) => ({ ...f, lastName: e.target.value }))}
                        className="w-full border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-black tracking-widest uppercase block mb-1.5">Téléphone *</label>
                    <input required value={addrForm.phone} onChange={(e) => setAddrForm((f) => ({ ...f, phone: e.target.value }))} placeholder="+212 6XX XXX XXX"
                      className="w-full border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black tracking-widest uppercase block mb-1.5">Adresse *</label>
                    <input required value={addrForm.address} onChange={(e) => setAddrForm((f) => ({ ...f, address: e.target.value }))}
                      className="w-full border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-black tracking-widest uppercase block mb-1.5">Ville *</label>
                      <input required value={addrForm.city} onChange={(e) => setAddrForm((f) => ({ ...f, city: e.target.value }))}
                        className="w-full border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black" />
                    </div>
                    <div>
                      <label className="text-[10px] font-black tracking-widest uppercase block mb-1.5">Code postal</label>
                      <input value={addrForm.zip} onChange={(e) => setAddrForm((f) => ({ ...f, zip: e.target.value }))}
                        className="w-full border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black" />
                    </div>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={addrForm.isDefault} onChange={(e) => setAddrForm((f) => ({ ...f, isDefault: e.target.checked }))}
                      className="accent-black" />
                    <span className="text-xs font-bold">Définir comme adresse principale</span>
                  </label>

                  <div className="flex gap-3">
                    <button type="button" onClick={() => { setShowAddressForm(false); setEditingAddress(null); }}
                      className="flex-1 border border-gray-300 py-2.5 text-[11px] font-black tracking-widest uppercase hover:border-black transition-colors">
                      Annuler
                    </button>
                    <button type="submit"
                      className="flex-[2] bg-black text-white py-2.5 text-[11px] font-black tracking-widest uppercase hover:bg-gray-800 transition-colors">
                      {editingAddress ? 'Enregistrer' : 'Ajouter l\'adresse'}
                    </button>
                  </div>
                </form>
              ) : addresses.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-gray-300">
                  <MapPin size={36} strokeWidth={1} className="mx-auto mb-3 text-gray-300" />
                  <p className="text-sm font-bold text-gray-500">Aucune adresse enregistrée</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {addresses.map((addr) => (
                    <div key={addr.id} className={`border p-4 ${addr.isDefault ? 'border-black' : 'border-gray-200'}`}>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          {addr.isDefault && (
                            <span className="text-[9px] font-black tracking-widest uppercase bg-black text-white px-1.5 py-0.5 mr-2">Par défaut</span>
                          )}
                          <p className="text-xs font-black uppercase tracking-wide inline">{addr.label}</p>
                          <p className="text-sm font-bold mt-1">{addr.firstName} {addr.lastName}</p>
                          <p className="text-xs text-gray-600">{addr.address}</p>
                          <p className="text-xs text-gray-600">{addr.city} {addr.zip}</p>
                          <p className="text-xs text-gray-500">{addr.phone}</p>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <button onClick={() => openEditAddress(addr)} className="p-1.5 hover:bg-gray-100 transition-colors" aria-label="Modifier">
                            <Edit2 size={13} />
                          </button>
                          <button onClick={() => removeAddress(addr.id)} className="p-1.5 hover:bg-red-50 transition-colors text-gray-500 hover:text-red-600" aria-label="Supprimer">
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* PROFILE */}
          {tab === 'profile' && (
            <div>
              <h2 className="text-xs font-black tracking-widest uppercase mb-5 border-b border-gray-200 pb-3">Mon Profil</h2>
              <form onSubmit={saveProfile} className="space-y-5 max-w-md">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black tracking-widest uppercase block mb-1.5">Prénom</label>
                    <input value={profileForm.firstName} onChange={(e) => setProfileForm((f) => ({ ...f, firstName: e.target.value }))}
                      className="w-full border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-black" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black tracking-widest uppercase block mb-1.5">Nom</label>
                    <input value={profileForm.lastName} onChange={(e) => setProfileForm((f) => ({ ...f, lastName: e.target.value }))}
                      className="w-full border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-black" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black tracking-widest uppercase block mb-1.5">E-mail</label>
                  <input type="email" value={profileForm.email} onChange={(e) => setProfileForm((f) => ({ ...f, email: e.target.value }))}
                    className="w-full border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-black" />
                </div>
                <div>
                  <label className="text-[10px] font-black tracking-widest uppercase block mb-1.5">Téléphone</label>
                  <input value={profileForm.phone} onChange={(e) => setProfileForm((f) => ({ ...f, phone: e.target.value }))} placeholder="+212 6XX XXX XXX"
                    className="w-full border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-black" />
                </div>

                <button type="submit" className="flex items-center gap-2 bg-black text-white px-6 py-3 text-[11px] font-black tracking-widest uppercase hover:bg-gray-800 transition-colors">
                  {profileSaved ? <><Check size={13} /> Enregistré</> : 'Enregistrer les modifications'}
                </button>
              </form>

              <div className="mt-10 pt-8 border-t border-gray-200">
                <h3 className="text-[10px] font-black tracking-widest uppercase text-gray-500 mb-4">Informations du compte</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex gap-3 text-gray-600">
                    <span className="font-bold w-32 flex-shrink-0">ID client</span>
                    <span className="text-gray-400 font-mono text-xs">{user?.id}</span>
                  </div>
                  <div className="flex gap-3 text-gray-600">
                    <span className="font-bold w-32 flex-shrink-0">Commandes</span>
                    <span>{orders.length} commande{orders.length > 1 ? 's' : ''}</span>
                  </div>
                </div>
                <button
                  onClick={() => { logout(); navigate('/'); }}
                  className="mt-6 flex items-center gap-2 text-[11px] font-black tracking-widest uppercase text-red-600 hover:text-red-700 underline hover:no-underline"
                >
                  <LogOut size={13} /> Se déconnecter
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}
