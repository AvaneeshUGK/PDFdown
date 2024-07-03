sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'invoicedownload/test/integration/FirstJourney',
		'invoicedownload/test/integration/pages/InvoiceList',
		'invoicedownload/test/integration/pages/InvoiceObjectPage'
    ],
    function(JourneyRunner, opaJourney, InvoiceList, InvoiceObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('invoicedownload') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheInvoiceList: InvoiceList,
					onTheInvoiceObjectPage: InvoiceObjectPage
                }
            },
            opaJourney.run
        );
    }
);