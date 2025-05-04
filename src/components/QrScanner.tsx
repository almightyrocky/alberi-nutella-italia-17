
import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Camera, ScanQrCode } from "lucide-react";
import { toast } from "sonner";

interface QrScannerProps {
  onCodeScanned: (code: string) => void;
}

const QrScanner: React.FC<QrScannerProps> = ({ onCodeScanned }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  // Gestisce l'apertura della fotocamera
  const handleOpenCamera = async () => {
    setIsOpen(true);
    setIsScanning(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setHasPermission(true);
      }
    } catch (err) {
      console.error("Errore nell'accesso alla fotocamera:", err);
      toast.error("Impossibile accedere alla fotocamera. Verifica di aver concesso i permessi necessari.");
      setHasPermission(false);
    }
  };

  // Ferma la fotocamera quando si chiude il dialog
  const handleClose = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
    setIsScanning(false);
    setIsOpen(false);
  };

  // Scansiona i frame del video alla ricerca di QR code
  useEffect(() => {
    let animationFrame: number;
    let jsQRScanner: any;

    const scanQRCode = async () => {
      if (!isScanning || !videoRef.current || !canvasRef.current) return;

      // Importa la libreria jsQR dinamicamente
      if (!jsQRScanner) {
        try {
          const jsQR = (await import('jsqr')).default;
          jsQRScanner = jsQR;
        } catch (err) {
          console.error("Errore nel caricamento della libreria jsQR:", err);
          toast.error("Impossibile caricare lo scanner QR. Riprova più tardi.");
          handleClose();
          return;
        }
      }

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (context && video.readyState === video.HAVE_ENOUGH_DATA) {
        // Imposta le dimensioni del canvas per corrispondere al video
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;

        // Disegna il frame del video sul canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Ottieni i dati dell'immagine
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        
        // Scansiona il QR code
        const code = jsQRScanner(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert",
        });

        if (code) {
          // QR code trovato
          console.log("QR Code trovato:", code.data);
          handleClose();
          onCodeScanned(code.data);
          toast.success("Codice QR scansionato con successo!");
          return;
        }
      }

      // Continua la scansione
      animationFrame = requestAnimationFrame(scanQRCode);
    };

    if (isScanning && hasPermission) {
      animationFrame = requestAnimationFrame(scanQRCode);
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isScanning, hasPermission, onCodeScanned]);

  return (
    <>
      <Button 
        variant="outline" 
        className="gap-2" 
        onClick={handleOpenCamera}
        type="button"
      >
        <Camera size={18} />
        <span>Scansiona QR Code</span>
      </Button>

      <Dialog open={isOpen} onOpenChange={(open) => {
        if (!open) handleClose();
      }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ScanQrCode size={20} />
              <span>Scansiona QR Code Nutella</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="relative flex flex-col items-center">
            {hasPermission === false && (
              <div className="p-4 text-center text-red-500">
                Accesso alla fotocamera negato. Verifica le impostazioni del browser.
              </div>
            )}
            
            <div className="relative w-full aspect-square mx-auto overflow-hidden rounded-lg border border-gray-200">
              <video 
                ref={videoRef} 
                className="absolute inset-0 w-full h-full object-cover" 
                playsInline 
                muted 
                autoPlay 
              />
              <canvas 
                ref={canvasRef} 
                className="absolute inset-0 w-full h-full hidden" 
              />
              
              {isScanning && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="border-2 border-white border-opacity-50 w-2/3 h-2/3 rounded-lg"></div>
                </div>
              )}
            </div>
            
            <p className="text-sm text-gray-500 mt-4 text-center">
              Posiziona il QR Code Nutella all'interno del riquadro per scansionarlo automaticamente
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default QrScanner;
