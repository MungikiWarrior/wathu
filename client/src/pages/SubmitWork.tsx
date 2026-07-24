import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { toast } from "sonner";
import { Upload, Loader2, X } from "lucide-react";
import { useLocation } from "wouter";

const SERVICE_TYPES = [
  "Logo Design",
  "Branding",
  "Illustration",
  "UI/UX",
  "Print Design",
  "Social Media Graphics",
  "Other",
];

const ACCEPTED_FILE_TYPES = [".png", ".jpg", ".jpeg", ".svg", ".pdf", ".ai", ".psd"];

export default function SubmitWork() {
  const { user, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();
  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    location: "",
    description: "",
    serviceType: "",
    customServiceType: "",
  });
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createSubmission = trpc.submissions.create.useMutation();

  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate("/");
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceTypeChange = (value: string) => {
    setFormData(prev => ({ ...prev, serviceType: value, customServiceType: "" }));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      const ext = "." + file.name.split(".").pop()?.toLowerCase();
      if (!ACCEPTED_FILE_TYPES.includes(ext)) {
        toast.error(`File type ${ext} not supported. Accepted: ${ACCEPTED_FILE_TYPES.join(", ")}`);
        return false;
      }
      return true;
    });
    setUploadedFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.fullName.trim()) {
      toast.error("Full name is required");
      return;
    }
    if (!formData.location.trim()) {
      toast.error("Location is required");
      return;
    }
    if (!formData.description.trim() || formData.description.length < 10) {
      toast.error("Description must be at least 10 characters");
      return;
    }
    if (!formData.serviceType) {
      toast.error("Please select a service type");
      return;
    }
    if (formData.serviceType === "Other" && !formData.customServiceType.trim()) {
      toast.error("Please specify your service type");
      return;
    }
    if (uploadedFiles.length === 0) {
      toast.error("Please upload at least one file");
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate file upload to S3 (in production, use actual S3 upload)
      const fileUrls = uploadedFiles.map((file, idx) => `/uploads/file-${Date.now()}-${idx}`);
      const fileNames = uploadedFiles.map(f => f.name);

      await createSubmission.mutateAsync({
        fullName: formData.fullName,
        location: formData.location,
        description: formData.description,
        serviceType: formData.serviceType,
        customServiceType: formData.customServiceType || undefined,
        fileUrls: JSON.stringify(fileUrls),
        fileNames: JSON.stringify(fileNames),
      });

      toast.success("Your work has been submitted successfully!");
      navigate("/profile");
    } catch (error) {
      toast.error("Failed to submit your work. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <section className="section-padding">
          <div className="container max-w-2xl">
            <div className="mb-12">
              <h1>Submit Your Work</h1>
              <p className="text-lg text-foreground/70 mt-4">
                Tell us about your project and upload your design files. We'll review your submission and get back to you shortly.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="card-elegant p-8 space-y-8">
              {/* Full Name */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-foreground">Full Name</label>
                <Input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  className="h-12"
                />
              </div>

              {/* Location */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-foreground">Location</label>
                <Input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="City, Country"
                  className="h-12"
                />
              </div>

              {/* Description */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-foreground">Description of Work</label>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your project in detail..."
                  className="min-h-32 resize-none"
                />
                <p className="text-xs text-foreground/50">
                  {formData.description.length}/500 characters
                </p>
              </div>

              {/* Service Type */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-foreground">Service Type</label>
                <Select value={formData.serviceType} onValueChange={handleServiceTypeChange}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select a service type" />
                  </SelectTrigger>
                  <SelectContent>
                    {SERVICE_TYPES.map(type => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Custom Service Type (shown when "Other" is selected) */}
              {formData.serviceType === "Other" && (
                <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                  <label className="text-sm font-semibold text-foreground">Specify Your Service</label>
                  <Input
                    type="text"
                    name="customServiceType"
                    value={formData.customServiceType}
                    onChange={handleInputChange}
                    placeholder="What type of design service do you need?"
                    className="h-12"
                  />
                </div>
              )}

              {/* File Upload */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-foreground">Upload Design Files</label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-accent/50 transition-colors cursor-pointer">
                  <input
                    type="file"
                    multiple
                    accept={ACCEPTED_FILE_TYPES.join(",")}
                    onChange={handleFileSelect}
                    className="hidden"
                    id="file-input"
                  />
                  <label htmlFor="file-input" className="cursor-pointer block">
                    <Upload className="mx-auto mb-3 text-accent/50" size={32} />
                    <p className="font-medium text-foreground mb-1">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-sm text-foreground/50">
                      PNG, JPEG, SVG, PDF, AI, PSD (Max 10MB each)
                    </p>
                  </label>
                </div>

                {/* Uploaded Files List */}
                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground">
                      {uploadedFiles.length} file{uploadedFiles.length !== 1 ? "s" : ""} selected
                    </p>
                    <div className="space-y-2">
                      {uploadedFiles.map((file, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 bg-muted rounded-lg"
                        >
                          <span className="text-sm text-foreground truncate">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeFile(idx)}
                            className="text-foreground/50 hover:text-destructive transition-colors"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-premium-primary w-full h-12 text-base gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Your Work"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
