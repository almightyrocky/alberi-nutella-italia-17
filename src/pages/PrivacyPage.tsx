
import React from 'react';
import Layout from '@/components/Layout';

const PrivacyPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-display font-bold text-nutella-brown mb-8">
            Informativa sulla Privacy
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-6">
              La presente Informativa sulla Privacy descrive come Nutella Forest raccoglie, utilizza e protegge 
              i dati personali degli utenti che utilizzano la nostra piattaforma per adottare alberi e 
              partecipare al nostro programma di riforestazione.
            </p>

            <h2 className="text-xl font-bold text-nutella-brown mt-8 mb-4">1. Informazioni che raccogliamo</h2>
            <p className="text-gray-700 mb-4">
              Possiamo raccogliere i seguenti tipi di informazioni personali:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li className="mb-2">Informazioni di contatto (come nome, indirizzo email, numero di telefono)</li>
              <li className="mb-2">Informazioni di registrazione dell'account (nome utente, password)</li>
              <li className="mb-2">Codici dei barattoli Nutella utilizzati per adottare alberi</li>
              <li className="mb-2">Informazioni sugli alberi adottati (nomi, date di adozione)</li>
              <li className="mb-2">Dati di utilizzo del sito web e dell'applicazione</li>
              <li className="mb-2">Comunicazioni con il nostro team di supporto</li>
            </ul>

            <h2 className="text-xl font-bold text-nutella-brown mt-8 mb-4">2. Come utilizziamo le tue informazioni</h2>
            <p className="text-gray-700 mb-4">
              Utilizziamo le informazioni personali per:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li className="mb-2">Gestire il tuo account e fornire i servizi richiesti</li>
              <li className="mb-2">Elaborare e confermare l'adozione degli alberi</li>
              <li className="mb-2">Fornirti aggiornamenti sul tuo albero e sul suo impatto ambientale</li>
              <li className="mb-2">Migliorare e personalizzare la tua esperienza sulla piattaforma</li>
              <li className="mb-2">Comunicare con te riguardo al programma Nutella Forest e altre iniziative correlate</li>
              <li className="mb-2">Rispondere alle tue domande e richieste di assistenza</li>
              <li className="mb-2">Analizzare l'utilizzo del sito per migliorarlo</li>
            </ul>

            <h2 className="text-xl font-bold text-nutella-brown mt-8 mb-4">3. Condivisione delle informazioni</h2>
            <p className="text-gray-700 mb-6">
              Non vendiamo, affittiamo o scambiamo i tuoi dati personali con terze parti. Potremmo condividere 
              le tue informazioni con:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li className="mb-2">Partner per la riforestazione che piantano e gestiscono gli alberi</li>
              <li className="mb-2">Fornitori di servizi che ci aiutano a gestire il sito e i servizi</li>
              <li className="mb-2">Autorità pubbliche, se richiesto dalla legge</li>
            </ul>

            <h2 className="text-xl font-bold text-nutella-brown mt-8 mb-4">4. Cookie e tecnologie simili</h2>
            <p className="text-gray-700 mb-6">
              Utilizziamo cookie e tecnologie simili per migliorare l'esperienza utente, analizzare l'utilizzo 
              del sito e personalizzare i contenuti. Puoi gestire le impostazioni dei cookie tramite il tuo browser.
            </p>

            <h2 className="text-xl font-bold text-nutella-brown mt-8 mb-4">5. I tuoi diritti</h2>
            <p className="text-gray-700 mb-4">
              In qualità di utente, hai il diritto di:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li className="mb-2">Accedere ai dati personali che abbiamo su di te</li>
              <li className="mb-2">Correggere dati inaccurati o incompleti</li>
              <li className="mb-2">Richiedere la cancellazione dei tuoi dati</li>
              <li className="mb-2">Limitare o opporti al trattamento dei tuoi dati</li>
              <li className="mb-2">Richiedere la portabilità dei tuoi dati</li>
              <li className="mb-2">Revocare il consenso al trattamento dei dati</li>
            </ul>

            <h2 className="text-xl font-bold text-nutella-brown mt-8 mb-4">6. Sicurezza dei dati</h2>
            <p className="text-gray-700 mb-6">
              Adottiamo misure di sicurezza tecniche e organizzative per proteggere i tuoi dati personali 
              da accessi non autorizzati, perdite o alterazioni. Tuttavia, nessun sistema di trasmissione 
              o archiviazione dati su Internet può garantire una sicurezza al 100%.
            </p>

            <h2 className="text-xl font-bold text-nutella-brown mt-8 mb-4">7. Modifiche alla presente Informativa</h2>
            <p className="text-gray-700 mb-6">
              Potremmo aggiornare questa Informativa sulla Privacy periodicamente. La versione più recente 
              sarà sempre disponibile su questo sito web con la data dell'ultimo aggiornamento.
            </p>

            <h2 className="text-xl font-bold text-nutella-brown mt-8 mb-4">8. Contattaci</h2>
            <p className="text-gray-700 mb-6">
              Per qualsiasi domanda o preoccupazione riguardo alla presente Informativa sulla Privacy o 
              al trattamento dei tuoi dati personali, puoi contattarci all'indirizzo email: privacy@nutellaforest.it
            </p>

            <p className="text-gray-700 mt-12 text-sm">
              Ultimo aggiornamento: 3 Maggio 2025
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPage;
