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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Plus, Edit2, Trash2, Image as ImageIcon, AlertCircle } from "lucide-react";

interface PortfolioItem {
  id: number;
  title: string;
  story: string;
  packageType: string;
  imageUrl: string;
  createdAt: Date | null;
}

interface PortfolioManagerProps {
  initialItems: PortfolioItem[];
}

export function PortfolioManager({ initialItems }: PortfolioManagerProps) {
  // TODO: Phase 2: connect this dynamic table to the public /portraits page
  // Currently, the public portraits page renders hardcoded test cases from Group 4.
  const [items, setItems] = useState<PortfolioItem[]>(initialItems);
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  
  // Form states
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [packageType, setPackageType] = useState("simple");
  const [imageUrl, setImageUrl] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getPackageTypeBadge = (type: string) => {
    switch (type) {
      case "simple":
        return <Badge variant="sage">Simple Package</Badge>;
      case "something-special":
        return <Badge variant="sand">Something Special</Badge>;
      case "remembrance":
        return <Badge variant="linen">Remembrance</Badge>;
      default:
        return <Badge variant="linen">{type}</Badge>;
    }
  };

  const openAddDialog = () => {
    setEditingItem(null);
    setTitle("");
    setStory("");
    setPackageType("simple");
    setImageUrl("");
    setError(null);
    setIsOpen(true);
  };

  const openEditDialog = (item: PortfolioItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setStory(item.story);
    setPackageType(item.packageType);
    setImageUrl(item.imageUrl);
    setError(null);
    setIsOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const payload = { title, story, packageType, imageUrl };

    try {
      if (editingItem) {
        // Edit Mode
        const res = await fetch(`/api/admin/portfolio/${editingItem.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error("Failed to update portfolio item");
        const updated: PortfolioItem = await res.json();

        setItems((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
      } else {
        // Add Mode
        const res = await fetch("/api/admin/portfolio", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error("Failed to create portfolio item");
        const created: PortfolioItem = await res.json();

        setItems((prev) => [created, ...prev]);
      }
      setIsOpen(false);
    } catch (err) {
      setError("An error occurred. Please verify your fields and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (itemId: number) => {
    if (!window.confirm("Are you sure you want to delete this portfolio item?")) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/portfolio/${itemId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete portfolio item");

      setItems((prev) => prev.filter((item) => item.id !== itemId));
    } catch (err) {
      alert("Failed to delete item. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-heading text-xl text-deep-pine font-normal">
            Case Study List
          </h2>
          <p className="font-body text-xs text-ink-soft">
            Manage Claire's showcased artwork and portrait stories.
          </p>
        </div>
        <BrandButton
          onClick={openAddDialog}
          leadingIcon={Plus}
          className="h-9 px-4 text-xs shrink-0"
        >
          Add Case Study
        </BrandButton>
      </div>

      <div className="w-full bg-white rounded-lg border border-border-soft overflow-hidden shadow-soft">
        <Table>
          <TableHeader className="bg-cream/40">
            <TableRow className="border-b border-border-soft hover:bg-transparent">
              <TableHead className="font-body text-xs font-semibold uppercase tracking-wider text-ink py-4 pl-6 w-1/4">
                Title
              </TableHead>
              <TableHead className="font-body text-xs font-semibold uppercase tracking-wider text-ink py-4 w-1/5">
                Package Type
              </TableHead>
              <TableHead className="font-body text-xs font-semibold uppercase tracking-wider text-ink py-4 w-2/5">
                Story Snippet
              </TableHead>
              <TableHead className="font-body text-xs font-semibold uppercase tracking-wider text-ink py-4 text-right pr-6 w-1/6">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-ink-soft font-body text-sm">
                  No portfolio items found. Add one to get started!
                </TableCell>
              </TableRow>
            ) : (
              items.map((item) => (
                <TableRow key={item.id} className="border-b border-border-soft hover:bg-cream/20">
                  <TableCell className="font-body text-sm font-medium text-ink py-4 pl-6">
                    <div className="flex items-center gap-3">
                      {item.imageUrl && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-10 h-10 object-cover rounded bg-cream border border-border-soft shrink-0"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = "none";
                          }}
                        />
                      )}
                      <span className="line-clamp-1">{item.title}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    {getPackageTypeBadge(item.packageType)}
                  </TableCell>
                  <TableCell className="font-body text-sm text-ink-soft py-4 pr-4">
                    <p className="line-clamp-1">{item.story}</p>
                  </TableCell>
                  <TableCell className="py-4 pr-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEditDialog(item)}
                        className="p-1.5 rounded-full border border-border-soft hover:bg-cream/40 text-ink-soft hover:text-deep-pine transition-all cursor-pointer"
                        title="Edit Case Study"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 rounded-full border border-error/20 hover:bg-error/10 text-error/80 hover:text-error transition-all cursor-pointer"
                        title="Delete Case Study"
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

      {/* Add / Edit Dialog */}
      <Dialog open={isOpen} onOpenChange={(open) => !open && setIsOpen(false)}>
        <DialogContent className="sm:max-w-md bg-white border border-border-soft rounded-lg shadow-card p-6 outline-none font-body">
          <DialogHeader className="border-b border-border-soft pb-4 mb-4">
            <DialogTitle className="font-heading text-2xl text-deep-pine font-normal">
              {editingItem ? "Edit Case Study" : "Add Case Study"}
            </DialogTitle>
            <DialogDescription className="font-body text-xs text-ink-soft uppercase tracking-wider mt-0.5">
              Fill in case study details for Claire's pet portraits.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-error/10 border border-error/20 text-error rounded-md flex items-center gap-2 text-xs">
                <AlertCircle size={14} />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-1">
              <label htmlFor="item-title" className="block text-xs font-semibold uppercase tracking-wider text-ink-soft">
                Artwork / Case Study Title
              </label>
              <input
                id="item-title"
                type="text"
                required
                placeholder="e.g., Henry — Therapy Dog Portrait"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-border-soft rounded-md bg-white text-ink text-sm placeholder:text-ink-soft/40 focus:outline-none focus:ring-2 focus:ring-sage focus:border-sage transition-all"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="item-package" className="block text-xs font-semibold uppercase tracking-wider text-ink-soft">
                Portrait Package Type
              </label>
              <select
                id="item-package"
                value={packageType}
                onChange={(e) => setPackageType(e.target.value)}
                className="w-full px-3 py-2 border border-border-soft rounded-md bg-white text-ink text-sm focus:outline-none focus:ring-2 focus:ring-sage focus:border-sage transition-all"
              >
                <option value="simple">Simple Portrait Package</option>
                <option value="something-special">Something Special Package</option>
                <option value="remembrance">Remembrance Package</option>
              </select>
            </div>

            <div className="space-y-1">
              <label htmlFor="item-image" className="block text-xs font-semibold uppercase tracking-wider text-ink-soft">
                Image URL
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-ink-soft/50">
                  <ImageIcon size={14} />
                </div>
                <input
                  id="item-image"
                  type="text"
                  required
                  placeholder="e.g., /assets/portraits/henry.png"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-border-soft rounded-md bg-white text-ink text-sm placeholder:text-ink-soft/40 focus:outline-none focus:ring-2 focus:ring-sage focus:border-sage transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="item-story" className="block text-xs font-semibold uppercase tracking-wider text-ink-soft">
                Story / Description
              </label>
              <textarea
                id="item-story"
                required
                rows={4}
                placeholder="Describe the pet, the context of the portrait drawing, and the impact..."
                value={story}
                onChange={(e) => setStory(e.target.value)}
                className="w-full px-3 py-2 border border-border-soft rounded-md bg-white text-ink text-sm placeholder:text-ink-soft/40 focus:outline-none focus:ring-2 focus:ring-sage focus:border-sage transition-all resize-none"
              />
            </div>

            <div className="flex gap-3 justify-end pt-2 border-t border-border-soft/60 mt-4">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 border border-border-soft rounded-full font-body text-xs font-semibold text-ink-soft hover:bg-cream/40 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <BrandButton
                type="submit"
                disabled={isLoading}
                className="h-8 py-0 px-6 text-xs"
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </BrandButton>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
