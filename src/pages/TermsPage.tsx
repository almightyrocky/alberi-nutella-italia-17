
import React from 'react';
import Layout from '@/components/Layout';

const TermsPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-display font-bold text-nutella-brown mb-8">
            Termini e Condizioni
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-6">
              I presenti Termini e Condizioni ("Termini") regolano l'utilizzo della piattaforma Nutella Forest 
              e la partecipazione al programma di adozione degli alberi. Utilizzando il nostro sito web e i 
              nostri servizi, accetti di essere vincolato da questi Termini.
            </p>

            <h2 className="text-xl font-bold text-nutella-brown mt-8 mb-4">1. Definizioni</h2>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li className="mb-2"><strong>Piattaforma:</strong> il sito web Nutella Forest e tutti i servizi correlati.</li>
              <li className="mb-2"><strong>Utente:</strong> qualsiasi persona che accede o utilizza la Piattaforma.</li>
              <li className="mb-2"><strong>Codice:</strong> il codice univoco contenuto nei barattoli di Nutella partecipanti all'iniziativa.</li>
              <li className="mb-2"><strong>Adozione:</strong> il processo di associazione di un albero reale a un Utente registrato.</li>
            </ul>

            <h2 className="text-xl font-bold text-nutella-brown mt-8 mb-4">2. Registrazione e Account</h2>
            <p className="text-gray-700 mb-6">
              Per utilizzare la Piattaforma e adottare un albero, è necessario registrarsi e creare un account. 
              Durante la registrazione, ti impegni a fornire informazioni accurate, complete e aggiornate. Sei 
              responsabile del mantenimento della riservatezza delle credenziali del tuo account e di tutte le 
              attività che si verificano con il tuo account.
            </p>

            <h2 className="text-xl font-bold text-nutella-brown mt-8 mb-4">3. Adozione degli Alberi</h2>
            <p className="text-gray-700 mb-4">
              L'adozione di un albero è soggetta alle seguenti condizioni:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li className="mb-2">Ogni Codice è valido per l'adozione di un solo albero.</li>
              <li className="mb-2">I Codici non sono trasferibili e non possono essere rivenduti.</li>
              <li className="mb-2">L'adozione è simbolica e non conferisce alcun diritto di proprietà sull'albero fisico.</li>
              <li className="mb-2">Nutella si impegna a piantare e mantenere gli alberi adottati per un periodo minimo di 10 anni.</li>
              <li className="mb-2">Le informazioni sull'albero adottato fornite sulla Piattaforma sono approssimative e soggette a variazioni.</li>
            </ul>

            <h2 className="text-xl font-bold text-nutella-brown mt-8 mb-4">4. Utilizzo della Piattaforma</h2>
            <p className="text-gray-700 mb-4">
              Utilizzando la Piattaforma, l'Utente si impegna a:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li className="mb-2">Non utilizzare la Piattaforma per scopi illegali o non autorizzati.</li>
              <li className="mb-2">Non tentare di accedere a parti riservate della Piattaforma senza autorizzazione.</li>
              <li className="mb-2">Non interferire con il funzionamento della Piattaforma o dei server.</li>
              <li className="mb-2">Non caricare virus, malware o altro codice dannoso.</li>
              <li className="mb-2">Non utilizzare robot, spider o altri mezzi automatizzati per accedere alla Piattaforma.</li>
              <li className="mb-2">Non raccogliere informazioni su altri utenti senza il loro consenso.</li>
            </ul>

            <h2 className="text-xl font-bold text-nutella-brown mt-8 mb-4">5. Proprietà Intellettuale</h2>
            <p className="text-gray-700 mb-6">
              Tutti i contenuti presenti sulla Piattaforma, inclusi testi, grafica, logo, icone, immagini, 
              audio e video, sono di proprietà di Nutella o dei suoi licenzianti e sono protetti dalle leggi 
              sul copyright e altre leggi sulla proprietà intellettuale. Non è consentito copiare, modificare, 
              distribuire o utilizzare tali contenuti senza previa autorizzazione scritta.
            </p>

            <h2 className="text-xl font-bold text-nutella-brown mt-8 mb-4">6. Limitazione di Responsabilità</h2>
            <p className="text-gray-700 mb-6">
              La Piattaforma è fornita "così com'è" e "come disponibile". Nutella non garantisce che la 
              Piattaforma sarà sempre disponibile, ininterrotta, tempestiva, sicura o priva di errori. 
              Nutella non sarà responsabile per danni diretti, indiretti, incidentali, speciali, consequenziali 
              o punitivi derivanti dall'utilizzo o dall'impossibilità di utilizzare la Piattaforma.
            </p>

            <h2 className="text-xl font-bold text-nutella-brown mt-8 mb-4">7. Modifiche ai Termini</h2>
            <p className="text-gray-700 mb-6">
              Nutella si riserva il diritto di modificare questi Termini in qualsiasi momento. Le modifiche 
              entreranno in vigore immediatamente dopo la pubblicazione sulla Piattaforma. L'utilizzo continuato 
              della Piattaforma dopo tali modifiche costituisce l'accettazione dei nuovi Termini.
            </p>

            <h2 className="text-xl font-bold text-nutella-brown mt-8 mb-4">8. Legge Applicabile</h2>
            <p className="text-gray-700 mb-6">
              I presenti Termini sono regolati e interpretati in conformità con le leggi italiane. 
              Qualsiasi controversia derivante da o in connessione con questi Termini sarà soggetta 
              alla giurisdizione esclusiva dei tribunali di Milano, Italia.
            </p>

            <h2 className="text-xl font-bold text-nutella-brown mt-8 mb-4">9. Contatti</h2>
            <p className="text-gray-700 mb-6">
              Per qualsiasi domanda o chiarimento sui presenti Termini e Condizioni, puoi contattarci 
              all'indirizzo email: legal@nutellaforest.it
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

export default TermsPage;
