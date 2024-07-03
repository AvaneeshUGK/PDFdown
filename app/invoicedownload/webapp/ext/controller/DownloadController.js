sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        downloadNow: async function(oEvent) {
            debugger
            // MessageToast.show("Custom handler invoked.");
            let context = this._view.getContent()[0].getContent().getContent().getSelectedContexts();
            var invoiceNos = [];
            var oModel = this._view.getModel();
            var num
            context.forEach(con =>{
                num = con.sPath.replace(/[^0-9]/g, "")
                invoiceNos.push(num)
            })
            var invoiceObj = {invoices : invoiceNos};

            var invStr = JSON.stringify(invoiceObj);

            var sFunctionName = "readInv";
			var oFunction = oModel.bindContext(`/${sFunctionName}(...)`);
            oFunction.setParameter("invoiceNo",invStr);
            await oFunction.execute();
			const oContext = oFunction.getBoundContext();
            const resPDF = oContext.getObject();
            var base64String  = resPDF.value;


// Decode the Base64 string
const binaryData = atob(base64String);

// Create an ArrayBuffer to hold the binary data
const arrayBuffer = new ArrayBuffer(binaryData.length);

// Create a view into the ArrayBuffer
const uint8Array = new Uint8Array(arrayBuffer);

// Populate the ArrayBuffer by iterating over the binary data
for (let i = 0; i < binaryData.length; i++) {
  uint8Array[i] = binaryData.charCodeAt(i);
}

// Create a Blob object from the ArrayBuffer
const blob = new Blob([uint8Array], { type: 'application/pdf' });

// // Create a URL for the Blob object
// const url = URL.createObjectURL(blob);

// // You can now use this URL to display the PDF in an iframe, or create a link to download it
// // For example, to open the PDF in a new window:
// window.open(url);

            // const pdfBuffer = Buffer.from(resPDF.value, 'base64');
            // var blobPDF = pdfBuffer.blob();
            // const url = URL.createObjectURL(blobPDF);
                    // Convert string to Blob
            
            // var pdfObj = JSON.parse(resPDF.value);
            // var pdfBlob = pdfObj.pdfdata;
            // var blob=new Blob([resPDF.value], {type: "application/pdf"});
            var link=document.createElement('a');
            link.href=window.URL.createObjectURL(blob);
            link.download="myFileName.pdf";
            link.click();
            MessageToast.show("PDF file Downloaded")
        }
    };
});
