# My Library

Questo progetto è un'applicazione web per gestire una libreria di libri personali. L'applicazione consente di aggiungere, visualizzare, e gestire i libri che l'utente desidera tenere in memoria.

## Funzionalità principali

- **Aggiunta di Libri:** Gli utenti possono aggiungere nuovi libri alla loro libreria inserendo il titolo e l'autore. Una volta inseriti, l'applicazione utilizza l'API di Google Books per cercare il libro e presentare i risultati trovati. Gli utenti possono selezionare il libro corretto dai risultati per aggiungerlo alla loro libreria.

- **Gestione dello stato di lettura:** Ogni libro aggiunto può essere contrassegnato come "letto" o "non letto" tramite l'icona del checkmark. Questo stato può essere modificato in qualsiasi momento.

- **Rimozione dei Libri:** Gli utenti possono rimuovere libri dalla libreria attraverso un'apposita icona di rimozione.

- **Gestione tramite LocalStorage:** La libreria viene salvata nel LocalStorage del browser, permettendo di mantenere i dati anche dopo la chiusura della pagina. I dati vengono caricati automaticamente all'avvio dell'applicazione.

- **Ricerca e Selezione:** L'applicazione offre una finestra di dialogo per la ricerca di libri e un'altra per mostrare i risultati ottenuti. Se non vengono trovati risultati corrispondenti alla ricerca, viene mostrato un messaggio di errore.

## Dipendenze

- **Google Books API:** Utilizzato per cercare e recuperare informazioni sui libri in base al titolo e all'autore inseriti dall'utente.

- **Ionicons:** Un set di icone utilizzato per rappresentare graficamente azioni come "Aggiungi", "Rimuovi" e "Contrassegna come Letto".

## Live demo

<p><a href="https://stetisci.github.io/library/" >My Library </p>
