const cds = require('@sap/cds');
const fs = require('fs');
const { executeHttpRequest, retrieveJwt } = require("@sap-cloud-sdk/core");
const { getDestination } = require("@sap-cloud-sdk/connectivity");
const axios = require('axios');
const {saveAs} = require('file-saver');
const {PDFDocument} = require('pdf-lib');


module.exports = cds.service.impl(async function(){

    function createBase64FromContent(byteList) {
        try {
            // debugger
            // Parse the comma-separated byte values into a Uint8Array
            const bytes = byteList.split(',').map(byte => parseInt(byte.trim(), 10));

            const uint8Array = new Uint8Array(bytes);
          
            // Convert the Uint8Array to base64
            const base64Data = Buffer.from(uint8Array).toString('base64');
          
            // Write the base64 data to a text file
            // fs.writeFileSync(outputBase64Path, base64Data);
            return base64Data;
          
            console.log(`Base64 data has been created and saved to: ${outputBase64Path}`);
        } catch (error) {
            console.error('Error:', error);
        }
    }
    const{
        Invoice,
        pdfcontain
    } = this.entities;
    let wipServ = await cds.connect.to('WIPRO_ODATA');
    this.before('READ',Invoice,async (req)=> {
        console.log(wipServ);
        let resultOdata = await wipServ.tx(req).get("/sap/opu/odata/sap/Z_INVOICE_WIPRO_SRV/invoiceListSet");
        // console.log("data_here");
        // console.log(resultOdata.length);
        let insa = [];
        let innera = [];
        resultOdata.forEach(res =>{
            innera.push(res.invoiceNo);
            innera.push(res.vendorNo);
            innera.push(res.fiscalYear);
            innera.push(res.invoiceAmnt);
            insa.push(innera);
            innera = [];
        })
        await DELETE(Invoice);
        let ins = await INSERT.into(Invoice).columns('invoiceNumber','customerNumber','fiscalYear','totalAmount').rows(insa);
        return req;
    });

    this.on('readInv',async function(req) {
        var invArr = JSON.parse(req.data.invoiceNo).invoices;
        // Connect to Destination
        let wipServ = await cds.connect.to('WIPRO_ODATA'); 
        // set call url
        var reqS = `/sap/opu/odata/sap/Z_INVOICE_WIPRO_SRV/invoiceDocSet(invoiceNo=%27${invArr[0]}%27,fiscalYear=%271998%27)`;
        // Make the odata call to get PDF in base64
        let resultOdatapdf = await wipServ.tx(req).get(reqS);

        console.log(resultOdatapdf)
        // let resultOdatapdf = await axios.get("https://virtualwipro:8011/sap/opu/odata/sap/Z_INVOICE_WIPRO_SRV/invoiceDocSet(invoiceNo='8',fiscalYear='1')", {
        //     headers: {
        //         'Authorization':"Basic " + btoa('developer09:peol@12345')
        //     }
        // },
        // {
        //     responseType : 'application/octet-stream;'
        // })

        // fs.writeFileSync('test2.pdf',resultOdatapdf.data);
        // var pdfContent = fs.readFileSync('test2', 'utf16le');
        // // pdfContent = pdfContent.replace('ï¿½ï¿½ï¿½ï¿½','µµµµ')
        // const pdfBytes = new Uint8Array(Buffer.from(pdfContent, 'latin1'));
      
        // // Load the existing PDF document
        // const pdfDoc = await PDFDocument.load(pdfBytes);
      
        // // Serialize the PDFDocument to bytes (a Uint8Array)
        // const pdfData = await pdfDoc.save();

        // var base64Data = pdfData.toString('base64');

        // base64Data = createBase64FromContent(base64Data);



        // let blob = new Blob([resultOdatapdf.data],{type:'application/pdf'})
        // saveAs('test.pdf',blob);

        // await INSERT.into(pdfcontain).entries({pdfdata:`${resultOdatapdf}`});

        // console.log(resultOdatapdf.length);
        // console.log(resultOdatapdf);
        // fs.writeFileSync('fil.pdf', resultOdatapdf, { encoding: 'binary' });
        // var pdfObj = {pdfdata : resultOdatapdf};
        // var pdfString = JSON.stringify(pdfObj);
        return resultOdatapdf.content;
    })
})