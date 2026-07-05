import { createFileRoute } from "@tanstack/react-router";
import { Download, FileText, Trash2, Upload } from "lucide-react";
import { useEffect, useState, type ChangeEvent } from "react";

type NotationItem = {
  id: string;
  name: string;
  fileName: string;
  dataUrl: string;
  sizeLabel: string;
};

const STORAGE_KEY = "octave8-notations";

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export const Route = createFileRoute("/notations")({
  head: () => ({
    meta: [
      { title: "Notations — Octave 8 Music Academy" },
      { name: "description", content: "Upload and download sheet music PDFs and song notations for your practice." },
    ],
  }),
  component: NotationsPage,
});

function NotationsPage() {
  const [items, setItems] = useState<NotationItem[]>([]);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [titleInput, setTitleInput] = useState("");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as NotationItem[];
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      setError("Could not load saved notations from this browser.");
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (!files.length) return;

    const title = titleInput.trim();
    if (!title) {
      setError("Please enter a title before uploading.");
      event.target.value = "";
      return;
    }

    setUploading(true);
    setError("");

    try {
      const uploaded = await Promise.all(
        files.map(
          (file) =>
            new Promise<NotationItem>((resolve, reject) => {
              if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
                reject(new Error(`${file.name} is not a PDF file.`));
                return;
              }

              const reader = new FileReader();
              reader.onload = () => {
                const dataUrl = reader.result as string;
                resolve({
                  id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
                  name: title,
                  fileName: file.name,
                  dataUrl,
                  sizeLabel: formatBytes(file.size),
                });
              };
              reader.onerror = () => reject(new Error(`Could not read ${file.name}.`));
              reader.readAsDataURL(file);
            }),
        ),
      );

      setItems((prev) => [...uploaded, ...prev]);
      setTitleInput("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  const handleDownload = (item: NotationItem) => {
    const link = document.createElement("a");
    link.href = item.dataUrl;
    link.download = item.fileName;
    link.click();
  };

  const handleRemove = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="max-w-3xl">
        <div className="text-sm uppercase tracking-[0.3em] text-primary">Notations</div>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl text-glow">Upload song sheets and practice PDFs</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Keep your song notations, chord sheets, and practice PDFs in one place. Upload files here and download them anytime.
        </p>
      </div>

      <div className="mt-10 rounded-3xl border border-border bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-display text-2xl">Your notation library</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Files are stored locally in this browser, so they stay available on this device.
            </p>
          </div>
          <div className="flex flex-col gap-3 md:min-w-[280px]">
            <input
              type="text"
              value={titleInput}
              onChange={(event) => setTitleInput(event.target.value)}
              placeholder="Enter title for the PDF"
              className="rounded-full border border-border bg-background px-4 py-2 text-sm outline-none ring-0 focus:border-primary"
            />
            <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-primary bg-primary/10 px-5 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground">
              <Upload size={16} />
              {uploading ? "Uploading..." : "Upload PDF"}
              <input type="file" accept="application/pdf" multiple onChange={handleUpload} className="hidden" />
            </label>
          </div>
        </div>

        {error ? <p className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p> : null}

        {items.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-border bg-background/60 p-10 text-center">
            <FileText className="mx-auto text-primary" size={36} />
            <h3 className="mt-4 font-display text-xl">No PDFs uploaded yet</h3>
            <p className="mt-2 text-sm text-muted-foreground">Add your first sheet music PDF to start building your collection.</p>
          </div>
        ) : (
          <div className="mt-8 grid gap-4">
            {items.map((item) => (
              <div key={item.id} className="flex flex-col gap-4 rounded-2xl border border-border bg-background/70 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.fileName}</p>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{item.sizeLabel}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleDownload(item)}
                    className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
                  >
                    <Download size={16} />
                    Download
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemove(item.id)}
                    className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-muted-foreground transition hover:border-destructive hover:text-destructive"
                  >
                    <Trash2 size={16} />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
