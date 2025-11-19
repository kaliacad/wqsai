import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/hooks/use-toast";
import { DialogDescription } from "./ui/dialog";

export default function ApiKeyModal() {
  const [apiKey, setApiKey] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const storedKey = localStorage.getItem("api_key");
    if (storedKey) {
      setIsOpen(false);
    }
  }, []);

  const handleSave = () => {
    if (!apiKey || apiKey.length < 20) {
      toast({
        title: "Invalid API Key",
        description: "Please enter a valid API key.",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("api_key", btoa(apiKey)); // Basic encryption with Base64
      toast({ title: "Success", description: "API Key saved successfully." });
      setLoading(false);
      setIsOpen(false);
    }, 1500);
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Authenticate API Access</DialogTitle>
          <DialogDescription>
            You must have a valid{" "}
            <a
              href="https://platform.openai.com/api-keys"
              className="text-green-500 hover:underline"
              target="_blank"
            >
              OpenAI API key
            </a>{" "}
            to connect the playground to your own OpenAI platform account.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Label htmlFor="apiKey" className="font-bold">
            Enter your{" "}
            <a
              href="https://platform.openai.com/api-keys"
              className="text-green-500 hover:underline"
              target="_blank"
            >
              OpenAI API key
            </a>
          </Label>
          <div className="relative">
            <Input
              id="apiKey"
              type={isVisible ? "text" : "password"}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..."
            />
          </div>
          <Button onClick={handleSave} disabled={loading} className="w-full">
            {loading ? "Saving..." : "Save API Key"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
