"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
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
import { Mail, Phone, Calendar, User, BookOpen, Clock, AlertCircle } from "lucide-react";

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  purpose: string;
  message: string | null;
  petNames: string | null;
  workshopType: string | null;
  preferredDate: string | null;
  preferredContactMethod: string | null;
  status: string | null;
  createdAt: Date | null;
}

interface LeadsTableProps {
  initialLeads: Lead[];
}

export function LeadsTable({ initialLeads }: LeadsTableProps) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  const getPurposeLabel = (purpose: string) => {
    switch (purpose) {
      case "portrait-inquiry":
        return "Portrait Inquiry";
      case "school-program":
        return "School Program";
      case "workshop-reservation":
        return "Workshop Reservation";
      case "general-question":
        return "General Question";
      default:
        return purpose;
    }
  };

  const getStatusBadge = (status: string | null) => {
    const s = status || "new";
    if (s === "new") {
      return <Badge variant="sage">New</Badge>;
    } else if (s === "contacted") {
      return <Badge variant="sand">Contacted</Badge>;
    } else {
      return (
        <Badge
          className="bg-ink-soft/10 text-ink-soft border border-ink-soft/20"
        >
          Closed
        </Badge>
      );
    }
  };

  const handleStatusChange = async (leadId: number, newStatus: string) => {
    setIsUpdating(true);
    setUpdateError(null);
    try {
      const res = await fetch(`/api/admin/leads/${leadId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        throw new Error("Failed to update status");
      }

      // Update state immediately
      setLeads((prevLeads) =>
        prevLeads.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
      );

      // Also update selected lead if dialog is open
      setSelectedLead((prev) => (prev && prev.id === leadId ? { ...prev, status: newStatus } : prev));
    } catch (err) {
      setUpdateError("Failed to update status. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="w-full bg-white rounded-lg border border-border-soft overflow-hidden shadow-soft">
      <Table>
        <TableHeader className="bg-cream/40">
          <TableRow className="border-b border-border-soft hover:bg-transparent">
            <TableHead className="font-body text-xs font-semibold uppercase tracking-wider text-ink py-4 pl-6">
              Name
            </TableHead>
            <TableHead className="font-body text-xs font-semibold uppercase tracking-wider text-ink py-4">
              Email
            </TableHead>
            <TableHead className="font-body text-xs font-semibold uppercase tracking-wider text-ink py-4">
              Purpose
            </TableHead>
            <TableHead className="font-body text-xs font-semibold uppercase tracking-wider text-ink py-4">
              Status
            </TableHead>
            <TableHead className="font-body text-xs font-semibold uppercase tracking-wider text-ink py-4">
              Created Date
            </TableHead>
            <TableHead className="font-body text-xs font-semibold uppercase tracking-wider text-ink py-4 pr-6 text-right">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-ink-soft font-body text-sm">
                No bookings or inquiry leads found.
              </TableCell>
            </TableRow>
          ) : (
            leads.map((lead) => (
              <TableRow key={lead.id} className="border-b border-border-soft hover:bg-cream/20">
                <TableCell className="font-body text-sm font-medium text-ink py-4 pl-6">
                  {lead.name}
                </TableCell>
                <TableCell className="font-body text-sm text-ink-soft py-4">
                  {lead.email}
                </TableCell>
                <TableCell className="py-4">
                  <Badge variant="sand">{getPurposeLabel(lead.purpose)}</Badge>
                </TableCell>
                <TableCell className="py-4">
                  {getStatusBadge(lead.status)}
                </TableCell>
                <TableCell className="font-body text-sm text-ink-soft py-4">
                  {formatDate(lead.createdAt)}
                </TableCell>
                <TableCell className="py-4 pr-6 text-right">
                  <button
                    onClick={() => {
                      setUpdateError(null);
                      setSelectedLead(lead);
                    }}
                    className="px-4 py-1.5 rounded-full border border-forest/30 font-body text-xs font-semibold text-deep-pine hover:bg-forest/10 hover:border-forest transition-colors cursor-pointer"
                  >
                    View Details
                  </button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Details Dialog */}
      <Dialog open={selectedLead !== null} onOpenChange={(open) => !open && setSelectedLead(null)}>
        {selectedLead && (
          <DialogContent className="sm:max-w-md bg-white border border-border-soft rounded-lg shadow-card p-6 outline-none font-body">
            <DialogHeader className="border-b border-border-soft pb-4 mb-4">
              <DialogTitle className="font-heading text-2xl text-deep-pine font-normal">
                Lead Details
              </DialogTitle>
              <DialogDescription className="font-body text-xs text-ink-soft uppercase tracking-wider mt-0.5">
                Submitted on {formatDate(selectedLead.createdAt)}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 my-2">
              {/* Error Message */}
              {updateError && (
                <div className="p-3 bg-error/10 border border-error/20 text-error rounded-md flex items-center gap-2 text-xs">
                  <AlertCircle size={14} />
                  <span>{updateError}</span>
                </div>
              )}

              {/* Status Update Option */}
              <div className="flex flex-col gap-2 p-3.5 bg-cream/35 border border-border-soft rounded-md">
                <label htmlFor="lead-status-select" className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
                  Update Lead Status
                </label>
                <div className="flex items-center gap-3">
                  <select
                    id="lead-status-select"
                    value={selectedLead.status || "new"}
                    onChange={(e) => handleStatusChange(selectedLead.id, e.target.value)}
                    disabled={isUpdating}
                    className="flex-1 px-3 py-1.5 border border-border-soft rounded-md bg-white text-ink text-sm focus:outline-none focus:ring-2 focus:ring-sage focus:border-sage transition-all"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed">Closed</option>
                  </select>
                  <div>{getStatusBadge(selectedLead.status)}</div>
                </div>
              </div>

              {/* Grid Information */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-2.5">
                  <User className="w-4 h-4 text-sage mt-0.5 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-ink-soft uppercase tracking-wider font-semibold">Client Name</span>
                    <span className="text-sm font-medium text-ink">{selectedLead.name}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <BookOpen className="w-4 h-4 text-sage mt-0.5 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-ink-soft uppercase tracking-wider font-semibold">Inquiry Purpose</span>
                    <span className="text-sm font-medium text-ink">{getPurposeLabel(selectedLead.purpose)}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 col-span-2">
                  <Mail className="w-4 h-4 text-sage mt-0.5 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-ink-soft uppercase tracking-wider font-semibold">Email</span>
                    <span className="text-sm font-medium text-ink">{selectedLead.email}</span>
                  </div>
                </div>
                {selectedLead.phone && (
                  <div className="flex items-start gap-2.5 col-span-2">
                    <Phone className="w-4 h-4 text-sage mt-0.5 shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-[10px] text-ink-soft uppercase tracking-wider font-semibold">Phone</span>
                      <span className="text-sm font-medium text-ink">{selectedLead.phone}</span>
                    </div>
                  </div>
                )}
                {selectedLead.preferredContactMethod && (
                  <div className="flex items-start gap-2.5 col-span-2">
                    <Clock className="w-4 h-4 text-sage mt-0.5 shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-[10px] text-ink-soft uppercase tracking-wider font-semibold">Preferred Contact</span>
                      <span className="text-sm font-medium text-ink capitalize">{selectedLead.preferredContactMethod}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Conditional Fields */}
              {selectedLead.purpose === "portrait-inquiry" && selectedLead.petNames && (
                <div className="p-3 bg-cream/10 border border-border-soft/60 rounded-md">
                  <span className="block text-[10px] text-ink-soft uppercase tracking-wider font-semibold mb-1">
                    Pet Name(s) / Description
                  </span>
                  <p className="text-sm font-medium text-ink">{selectedLead.petNames}</p>
                </div>
              )}

              {selectedLead.purpose === "workshop-reservation" && (
                <div className="p-3 bg-cream/10 border border-border-soft/60 rounded-md grid grid-cols-2 gap-3">
                  {selectedLead.workshopType && (
                    <div>
                      <span className="block text-[10px] text-ink-soft uppercase tracking-wider font-semibold mb-1">
                        Workshop Type
                      </span>
                      <p className="text-sm font-medium text-ink">{selectedLead.workshopType}</p>
                    </div>
                  )}
                  {selectedLead.preferredDate && (
                    <div>
                      <span className="block text-[10px] text-ink-soft uppercase tracking-wider font-semibold mb-1">
                        Preferred Date
                      </span>
                      <p className="text-sm font-medium text-ink flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-sage" />
                        {selectedLead.preferredDate}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Message Details */}
              {selectedLead.message && (
                <div className="border-t border-border-soft/60 pt-4 mt-2">
                  <span className="block text-[10px] text-ink-soft uppercase tracking-wider font-semibold mb-1.5">
                    Message
                  </span>
                  <p className="text-sm text-ink-soft leading-relaxed whitespace-pre-wrap bg-cream/20 p-3 rounded border border-border-soft/30 max-h-40 overflow-y-auto">
                    {selectedLead.message}
                  </p>
                </div>
              )}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
