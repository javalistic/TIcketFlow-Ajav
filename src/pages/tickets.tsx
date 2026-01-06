import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textArea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";
import Footer from "../components/footer";
import { toast } from "sonner";
import { z } from "zod";
import { Ticket, Plus, Edit2, Trash2, LogOut, X, ArrowLeft, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

interface TicketType {
  id: string;
  title: string;
  description: string;
  status: "open" | "in_progress" | "closed";
  priority: "low" | "medium" | "high";
  createdAt: string;
}

const ticketSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "Title is required" })
    .max(100, { message: "Title must be less than 100 characters" }),
  description: z
    .string()
    .trim()
    .max(500, { message: "Description must be less than 500 characters" })
    .optional(),
  status: z.enum(["open", "in_progress", "closed"], {
    message: "Status must be open, in_progress, or closed",
  }),
  priority: z.enum(["low", "medium", "high"]).optional(),
});

const Tickets = () => {
  const { logout } = useAuth();
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingTicket, setEditingTicket] = useState<TicketType | null>(null);
  const [deletingTicket, setDeletingTicket] = useState<TicketType | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    status: "open" | "in_progress" | "closed";
    priority: "low" | "medium" | "high";
  }>({
    title: "",
    description: "",
    status: "open",
    priority: "medium",
  });

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = () => {
    const savedTickets = JSON.parse(localStorage.getItem("tickets") || "[]");
    setTickets(savedTickets);
  };

  const saveTickets = (updatedTickets: TicketType[]) => {
    localStorage.setItem("tickets", JSON.stringify(updatedTickets));
    setTickets(updatedTickets);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      status: "open",
      priority: "medium",
    });
    setErrors({});
    setIsCreating(false);
    setEditingTicket(null);
  };

  const handleCreate = () => {
    setIsCreating(true);
    setFormData({
      title: "",
      description: "",
      status: "open",
      priority: "medium",
    });
  };

  const handleEdit = (ticket: TicketType) => {
    setEditingTicket(ticket);
    setFormData({
      title: ticket.title,
      description: ticket.description,
      status: ticket.status,
      priority: ticket.priority,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      ticketSchema.parse(formData);

      if (editingTicket) {
        // Update existing ticket
        const updatedTickets = tickets.map((t) =>
          t.id === editingTicket.id ? { ...t, ...formData } : t
        );
        saveTickets(updatedTickets);
        toast.success("Ticket updated successfully");
      } else {
        // Create new ticket
        const newTicket: TicketType = {
          id: Date.now().toString(),
          ...formData,
          createdAt: new Date().toISOString(),
        };
        saveTickets([...tickets, newTicket]);
        toast.success("Ticket created successfully");
      }

      resetForm();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.issues.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
        toast.error("Please fix the validation errors");
      }
    }
  };

  const confirmDelete = () => {
    if (deletingTicket) {
      const updatedTickets = tickets.filter((t) => t.id !== deletingTicket.id);
      saveTickets(updatedTickets);
      toast.success("Ticket deleted successfully");
      setDeletingTicket(null);
    }
  };

  const getStatusVariant = (status: string) => {
    const mapping: Record<
      string,
      "open" | "in_progress" | "closed" | "default"
    > = {
      open: "open",
      in_progress: "in_progress",
      closed: "closed",
    };
    return mapping[status] || "default";
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      open: "Open",
      in_progress: "In Progress",
      closed: "Closed",
    };
    return labels[status as keyof typeof labels] || status;
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: "bg-green-100 text-green-800 border-green-200",
      medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
      high: "bg-red-100 text-red-800 border-red-200",
    };
    return colors[priority as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const filteredTickets = statusFilter === "all" 
    ? tickets 
    : tickets.filter(ticket => ticket.status === statusFilter);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Decorative Circles */}
      <div className="fixed top-20 -left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="fixed bottom-20 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000 pointer-events-none" />
      
      {/* Header */}
      <header className="border-b border-slate-200/60 bg-white/80 backdrop-blur-sm shadow-sm relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="group">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ArrowLeft className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-br from-slate-800 to-slate-600 bg-clip-text text-transparent">
                    TicketFlow
                  </h1>
                  <p className="text-sm text-slate-600 hidden sm:inline">
                    Ticket Management
                  </p>
                </div>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/dashboard">
              <Button variant="outline" size="sm" className="border-slate-300/80 text-slate-700 hover:bg-slate-100 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Dashboard
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={logout}
              className="border-slate-300/80 text-slate-700 hover:bg-slate-100 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h2 className="text-4xl font-bold mb-3 bg-gradient-to-br from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Ticket Management
              </h2>
              <p className="text-slate-600 text-lg max-w-2xl leading-relaxed">
                Create, view, edit, and manage all your tickets in one place
              </p>
            </div>
            {!isCreating && !editingTicket && (
              <Button 
                onClick={handleCreate} 
                size="lg"
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                <Plus className="w-5 h-5 mr-2" />
                New Ticket
              </Button>
            )}
          </div>

          {/* Filters */}
          {!isCreating && !editingTicket && tickets.length > 0 && (
            <div className="flex items-center gap-4 mb-6">
              <Filter className="w-4 h-4 text-slate-500" aria-hidden="true" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48 bg-white/80 border-slate-300/80 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tickets</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              <Badge variant="outline" className="bg-white/80">
                {filteredTickets.length} {filteredTickets.length === 1 ? 'ticket' : 'tickets'}
              </Badge>
            </div>
          )}

          {/* Create/Edit Form */}
          {(isCreating || editingTicket) && (
            <Card className="mb-8 shadow-xl border-slate-200/60 bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-lg" />
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2 text-slate-800">
                    <Ticket className="w-5 h-5 text-blue-600" aria-hidden="true" />
                    {editingTicket ? "Edit Ticket" : "Create New Ticket"}
                  </CardTitle>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={resetForm}
                    className="hover:bg-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    aria-label="Close form"
                  >
                    <X className="w-4 h-4" aria-hidden="true" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="title" className="text-sm font-medium text-slate-700">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      placeholder="Enter ticket title"
                      aria-invalid={!!errors.title}
                      aria-describedby={
                        errors.title ? "title-error" : undefined
                      }
                      className="h-12 bg-white/50 border-slate-300/80 focus:border-blue-500/80 focus:ring-2 focus:ring-blue-500/20 transition-colors"
                    />
                    {errors.title && (
                      <p id="title-error" className="text-sm text-red-600 font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-red-600 rounded-full" aria-hidden="true"></span>
                        {errors.title}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="description" className="text-sm font-medium text-slate-700">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      placeholder="Provide details about the ticket..."
                      rows={4}
                      aria-invalid={!!errors.description}
                      aria-describedby={
                        errors.description ? "description-error" : undefined
                      }
                      className="bg-white/50 border-slate-300/80 focus:border-blue-500/80 focus:ring-2 focus:ring-blue-500/20 transition-colors resize-none"
                    />
                    {errors.description && (
                      <p
                        id="description-error"
                        className="text-sm text-red-600 font-medium flex items-center gap-1"
                      >
                        <span className="w-1.5 h-1.5 bg-red-600 rounded-full" aria-hidden="true"></span>
                        {errors.description}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="status" className="text-sm font-medium text-slate-700">Status *</Label>
                      <Select
                        value={formData.status}
                        onValueChange={(value: any) =>
                          setFormData({ ...formData, status: value })
                        }
                      >
                        <SelectTrigger id="status" className="bg-white/50 border-slate-300/80 focus:border-blue-500/80 focus:ring-2 focus:ring-blue-500/20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="open">Open</SelectItem>
                          <SelectItem value="in_progress">
                            In Progress
                          </SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.status && (
                        <p className="text-sm text-red-600 font-medium flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-red-600 rounded-full" aria-hidden="true"></span>
                          {errors.status}
                        </p>
                      )}
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="priority" className="text-sm font-medium text-slate-700">Priority</Label>
                      <Select
                        value={formData.priority}
                        onValueChange={(value: any) =>
                          setFormData({ ...formData, priority: value })
                        }
                      >
                        <SelectTrigger id="priority" className="bg-white/50 border-slate-300/80 focus:border-blue-500/80 focus:ring-2 focus:ring-blue-500/20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button 
                      type="submit"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      {editingTicket ? "Update Ticket" : "Create Ticket"}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={resetForm}
                      className="border-slate-300/80 text-slate-700 hover:bg-slate-100 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Tickets List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTickets.length === 0 ? (
              <Card className="col-span-full p-12 text-center bg-white/80 backdrop-blur-sm border-slate-200/60 hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
                  <Ticket className="w-8 h-8 text-slate-400" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">No tickets found</h3>
                <p className="text-slate-600 mb-6 max-w-sm mx-auto">
                  {statusFilter === "all" 
                    ? "Create your first ticket to get started with TicketFlow" 
                    : `No ${statusFilter.replace('_', ' ')} tickets found`
                  }
                </p>
                <Button 
                  onClick={handleCreate}
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  <Plus className="w-4 h-4 mr-2" aria-hidden="true" />
                  Create Ticket
                </Button>
              </Card>
            ) : (
              filteredTickets.map((ticket) => (
                <Card
                  key={ticket.id}
                  className="bg-white/80 backdrop-blur-sm border-slate-200/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2"
                >
                  <div className={`absolute top-0 left-0 w-full h-1 ${
                    ticket.status === 'open' ? 'bg-green-500' :
                    ticket.status === 'in_progress' ? 'bg-amber-500' :
                    'bg-gray-500'
                  } rounded-t-lg`} />
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start gap-2">
                      <CardTitle className="text-lg text-slate-800 line-clamp-2 group-hover:text-slate-900 transition-colors">
                        {ticket.title}
                      </CardTitle>
                      <Badge 
                        variant={getStatusVariant(ticket.status)}
                        className={`font-medium capitalize ${
                          ticket.status === 'open' ? 'bg-green-100 text-green-800 hover:bg-green-200' :
                          ticket.status === 'in_progress' ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' :
                          'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        {getStatusLabel(ticket.status)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-4">
                    {ticket.description && (
                      <p className="text-sm text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                        {ticket.description}
                      </p>
                    )}
                    <div className="flex items-center gap-3 text-xs">
                      <span className={`px-2 py-1 rounded-full border ${getPriorityColor(ticket.priority)} font-medium capitalize`}>
                        {ticket.priority}
                      </span>
                      <span className="text-slate-500">
                        {new Date(ticket.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2 pt-0">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-slate-300/80 text-slate-700 hover:bg-slate-100 hover:border-slate-400 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      onClick={() => handleEdit(ticket)}
                    >
                      <Edit2 className="w-3 h-3 mr-1" aria-hidden="true" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-medium shadow-sm hover:shadow-md transition-all duration-200 focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      onClick={() => setDeletingTicket(ticket)}
                    >
                      <Trash2 className="w-3 h-3 mr-1" aria-hidden="true" />
                      Delete
                    </Button>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deletingTicket}
        onOpenChange={() => setDeletingTicket(null)}
      >
        <AlertDialogContent className="bg-white/95 backdrop-blur-sm border-slate-200/60 max-w-md mx-auto">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-slate-800">Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-600">
              This will permanently delete the ticket <span className="font-semibold text-slate-800">"{deletingTicket?.title}"</span>.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-slate-300/80 text-slate-700 hover:bg-slate-100 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Delete Ticket
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Footer />
    </div>
  );
};

export default Tickets;