"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { BrandButton } from "@/components/ui/BrandButton";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Plus, Edit2, Trash2, AlertCircle, X, Upload } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Product {
  id: number;
  name: string;
  slug: string;
  category: string;
  description: string | null;
  price: number; // in fils (smallest unit)
  imageUrl: string | null;
  inStock: boolean | null;
  createdAt: Date | null;
}

interface ProductManagerProps {
  initialProducts: Product[];
}

const CATEGORY_MAP = {
  "tote-bags": "Tote Bags",
  "mugs": "Mugs",
  "planners-journals": "Planners & Journals",
  "cards": "Cards",
  "qatar-heritage": "Qatar Heritage Collection",
  "home-essentials": "Home Essentials",
} as const;

export function ProductManager({ initialProducts }: ProductManagerProps) {
  const [productsList, setProductsList] = useState<Product[]>(initialProducts);
  const [isOpen, setIsOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("tote-bags");
  const [description, setDescription] = useState("");
  const [priceStr, setPriceStr] = useState(""); // QAR amount e.g. "85.00"
  const [imageUrl, setImageUrl] = useState("");
  const [inStock, setInStock] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNameChange = (val: string) => {
    setName(val);
    // Auto-generate slug if not editing
    if (!editingProduct) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "")
      );
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/products/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to upload image");
      }
      const data = await res.json();
      setImageUrl(data.imageUrl);
    } catch (err: any) {
      setError(err.message || "Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const getCategoryLabel = (cat: string) => {
    return CATEGORY_MAP[cat as keyof typeof CATEGORY_MAP] || cat;
  };

  const formatPrice = (fils: number) => {
    return `QAR ${(fils / 100).toFixed(2)}`;
  };

  const openAddDialog = () => {
    setEditingProduct(null);
    setName("");
    setSlug("");
    setCategory("tote-bags");
    setDescription("");
    setPriceStr("");
    setImageUrl("");
    setInStock(true);
    setError(null);
    setIsOpen(true);
  };

  const openEditDialog = (prod: Product) => {
    setEditingProduct(prod);
    setName(prod.name);
    setSlug(prod.slug);
    setCategory(prod.category);
    setDescription(prod.description || "");
    setPriceStr((prod.price / 100).toFixed(2));
    setImageUrl(prod.imageUrl || "");
    setInStock(prod.inStock !== false);
    setError(null);
    setIsOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const priceFloat = parseFloat(priceStr);
    if (isNaN(priceFloat) || priceFloat < 0) {
      setError("Please enter a valid price.");
      setIsLoading(false);
      return;
    }

    const priceInFils = Math.round(priceFloat * 100);

    const payload = {
      name,
      slug,
      category,
      description: description || null,
      price: priceInFils,
      imageUrl: imageUrl || null,
      inStock,
    };

    try {
      if (editingProduct) {
        // Edit Mode
        const res = await fetch(`/api/admin/products/${editingProduct.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error("Failed to update product");
        const updated: Product = await res.json();

        setProductsList((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      } else {
        // Add Mode
        const res = await fetch("/api/admin/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error("Failed to create product");
        const created: Product = await res.json();

        setProductsList((prev) => [created, ...prev]);
      }
      setIsOpen(false);
    } catch (err) {
      setError("An error occurred. Check that the slug is unique and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (prodId: number) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/products/${prodId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete product");

      setProductsList((prev) => prev.filter((p) => p.id !== prodId));
    } catch (err) {
      alert("Failed to delete product. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-heading text-xl text-deep-pine font-normal">
            Product Inventory
          </h2>
          <p className="font-body text-xs text-ink-soft">
            Add, update, or remove online shop products.
          </p>
        </div>
        <BrandButton
          onClick={openAddDialog}
          leadingIcon={Plus}
          className="h-9 px-4 text-xs shrink-0"
        >
          Add Product
        </BrandButton>
      </div>

      <div className="w-full bg-white rounded-lg border border-border-soft overflow-hidden shadow-soft">
        <Table>
          <TableHeader className="bg-cream/40">
            <TableRow className="border-b border-border-soft hover:bg-transparent">
              <TableHead className="font-body text-xs font-semibold uppercase tracking-wider text-ink py-4 pl-6 w-1/3">
                Product
              </TableHead>
              <TableHead className="font-body text-xs font-semibold uppercase tracking-wider text-ink py-4 w-1/5">
                Category
              </TableHead>
              <TableHead className="font-body text-xs font-semibold uppercase tracking-wider text-ink py-4 w-1/6">
                Price
              </TableHead>
              <TableHead className="font-body text-xs font-semibold uppercase tracking-wider text-ink py-4 w-1/6">
                Status
              </TableHead>
              <TableHead className="font-body text-xs font-semibold uppercase tracking-wider text-ink py-4 text-right pr-6 w-1/6">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productsList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-ink-soft font-body text-sm">
                  No products in shop directory. Add one to list it.
                </TableCell>
              </TableRow>
            ) : (
              productsList.map((prod) => (
                <TableRow key={prod.id} className="border-b border-border-soft hover:bg-cream/20">
                  <TableCell className="font-body text-sm font-medium text-ink py-4 pl-6">
                    <div className="flex items-center gap-3">
                      {prod.imageUrl && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={prod.imageUrl}
                          alt={prod.name}
                          className="w-10 h-10 object-cover rounded bg-cream border border-border-soft shrink-0"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = "none";
                          }}
                        />
                      )}
                      <span className="line-clamp-1">{prod.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <Badge variant="sand">{getCategoryLabel(prod.category)}</Badge>
                  </TableCell>
                  <TableCell className="font-body text-sm font-medium text-ink py-4">
                    {formatPrice(prod.price)}
                  </TableCell>
                  <TableCell className="py-4">
                    {prod.inStock !== false ? (
                      <Badge variant="sage">In Stock</Badge>
                    ) : (
                      <Badge variant="linen">Out of Stock</Badge>
                    )}
                  </TableCell>
                  <TableCell className="py-4 pr-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEditDialog(prod)}
                        className="p-1.5 rounded-full border border-border-soft hover:bg-cream/40 text-ink-soft hover:text-deep-pine transition-all cursor-pointer"
                        title="Edit Product"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(prod.id)}
                        className="p-1.5 rounded-full border border-error/20 hover:bg-error/10 text-error/80 hover:text-error transition-all cursor-pointer"
                        title="Delete Product"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* ── Slide-over drawer ── */}
      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
        />
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-white border-l border-border-soft shadow-2xl flex flex-col font-body"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border-soft p-6">
              <div>
                <h3 className="font-heading text-2xl text-deep-pine font-normal">
                  {editingProduct ? "Edit Product" : "Add Product"}
                </h3>
                <p className="font-body text-xs text-ink-soft uppercase tracking-wider mt-0.5">
                  Configure details and inventory of a shop item
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-cream/40 text-ink-soft hover:text-deep-pine transition-all cursor-pointer"
                title="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
              {error && (
                <div className="p-3 bg-error/10 border border-error/20 text-error rounded-md flex items-center gap-2 text-xs">
                  <AlertCircle size={14} />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-5">
                {/* Product Name */}
                <div className="space-y-1">
                  <label htmlFor="prod-name" className="block text-xs font-semibold uppercase tracking-wider text-ink-soft">
                    Product Name
                  </label>
                  <input
                    id="prod-name"
                    type="text"
                    required
                    placeholder="e.g., Claire's Quail Linen Tote"
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    className="w-full px-3 py-2 border border-border-soft rounded-md bg-white text-ink text-sm placeholder:text-ink-soft/40 focus:outline-none focus:ring-2 focus:ring-sage focus:border-sage transition-all"
                  />
                </div>

                {/* URL Slug & Price */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="prod-slug" className="block text-xs font-semibold uppercase tracking-wider text-ink-soft">
                      URL Slug
                    </label>
                    <input
                      id="prod-slug"
                      type="text"
                      required
                      placeholder="e.g., quail-linen-tote"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      className="w-full px-3 py-2 border border-border-soft rounded-md bg-white text-ink text-sm placeholder:text-ink-soft/40 focus:outline-none focus:ring-2 focus:ring-sage focus:border-sage transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="prod-price" className="block text-xs font-semibold uppercase tracking-wider text-ink-soft">
                      Price (QAR)
                    </label>
                    <input
                      id="prod-price"
                      type="number"
                      step="0.01"
                      required
                      placeholder="e.g., 85.00"
                      value={priceStr}
                      onChange={(e) => setPriceStr(e.target.value)}
                      className="w-full px-3 py-2 border border-border-soft rounded-md bg-white text-ink text-sm placeholder:text-ink-soft/40 focus:outline-none focus:ring-2 focus:ring-sage focus:border-sage transition-all"
                    />
                  </div>
                </div>

                {/* Category */}
                <div className="space-y-1">
                  <label htmlFor="prod-category" className="block text-xs font-semibold uppercase tracking-wider text-ink-soft">
                    Category
                  </label>
                  <select
                    id="prod-category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-border-soft rounded-md bg-white text-ink text-sm focus:outline-none focus:ring-2 focus:ring-sage focus:border-sage transition-all"
                  >
                    <option value="tote-bags">Tote Bags</option>
                    <option value="mugs">Mugs</option>
                    <option value="planners-journals">Planners & Journals</option>
                    <option value="cards">Cards</option>
                    <option value="qatar-heritage">Qatar Heritage Collection</option>
                    <option value="home-essentials">Home Essentials</option>
                  </select>
                </div>

                {/* Image Upload Option */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ink-soft">
                    Product Image
                  </label>

                  {imageUrl ? (
                    <div className="relative group rounded-md overflow-hidden border border-border-soft bg-cream/20 w-40 h-40">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imageUrl}
                        alt="Product preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <label
                          htmlFor="prod-image-file"
                          className="px-3 py-1.5 bg-white text-ink text-[10px] font-semibold uppercase tracking-wider rounded shadow-sm cursor-pointer hover:bg-cream transition-colors"
                        >
                          Change Image
                        </label>
                      </div>
                    </div>
                  ) : (
                    <label
                      htmlFor="prod-image-file"
                      className="flex flex-col items-center justify-center border-2 border-dashed border-border-soft rounded-lg p-6 bg-cream/10 cursor-pointer hover:bg-cream/20 hover:border-sage transition-all w-40 h-40"
                    >
                      {isUploading ? (
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-6 h-6 border-2 border-sage border-t-transparent rounded-full animate-spin" />
                          <span className="text-[10px] text-ink-soft">Uploading...</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-ink-soft text-center">
                          <Upload size={20} className="text-ink-soft/60" />
                          <span className="text-[10px] font-semibold uppercase tracking-wider">Upload Image</span>
                        </div>
                      )}
                    </label>
                  )}

                  <input
                    id="prod-image-file"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                    className="hidden"
                  />
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label htmlFor="prod-desc" className="block text-xs font-semibold uppercase tracking-wider text-ink-soft">
                    Description
                  </label>
                  <textarea
                    id="prod-desc"
                    rows={4}
                    placeholder="Enter details, material quality, sizes, or special features..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-border-soft rounded-md bg-white text-ink text-sm placeholder:text-ink-soft/40 focus:outline-none focus:ring-2 focus:ring-sage focus:border-sage transition-all resize-none"
                  />
                </div>

                {/* Stock Status */}
                <div className="flex items-center gap-2.5 py-2.5 px-3 bg-cream/35 border border-border-soft rounded-md">
                  <input
                    id="prod-stock"
                    type="checkbox"
                    checked={inStock}
                    onChange={(e) => setInStock(e.target.checked)}
                    className="w-4 h-4 text-sage rounded border-border-soft focus:ring-sage focus:ring-2"
                  />
                  <label htmlFor="prod-stock" className="text-xs font-semibold uppercase tracking-wider text-ink-soft select-none cursor-pointer">
                    Product is currently in stock
                  </label>
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="flex gap-3 justify-end pt-5 border-t border-border-soft/60 mt-6">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-5 py-2 border border-border-soft rounded-full font-body text-xs font-semibold text-ink-soft hover:bg-cream/40 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <BrandButton
                  type="submit"
                  disabled={isLoading}
                  className="h-8 py-0 px-6 text-xs"
                >
                  {isLoading ? "Saving..." : "Save Product"}
                </BrandButton>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
