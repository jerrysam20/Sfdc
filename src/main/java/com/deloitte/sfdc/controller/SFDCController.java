package com.deloitte.sfdc.controller;


import com.deloitte.sfdc.dto.*;
import com.deloitte.sfdc.interfaces.Services;

import org.apache.commons.lang3.StringUtils;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@RestController
public class SFDCController {

    private static final String OUTPUT_FILE_PATH="src/main/resources/reports/sample.txt";
    private static final String outputHeader="<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
            "<Workflow xmlns=\"http://soap.sforce.com/2006/04/metadata\">";
    private static final String outputFooter="</Workflow>";

    private static final String headerTemplate="<HEADER>\n" +
            "<TALLYREQUEST>Import Data</TALLYREQUEST>\n" +
            "</HEADER>";

    private static final String envelope_Start_Tag="<ENVELOPE>";
    private static final String envelope_End_Tag="</ENVELOPE>";
    private static final String body_Start_Tag="<BODY>";
    private static final String body_End_Tag="</BODY>";
    private static final String importdata_Start_Tag="<IMPORTDATA>";
    private static final String importdata_End_Tag="</IMPORTDATA>";
    private static final String requestData_Start_Tag="<REQUESTDATA>";
    private static final String requestData_end_Tag="</REQUESTDATA>";



    private static final String requestDesc="<REQUESTDESC>\n" +
            "<REPORTNAME>All Masters</REPORTNAME>\n" +
            "<STATICVARIABLES>\n" +
            "<SVCURRENTCOMPANY>X</SVCURRENTCOMPANY>\n" +
            "</STATICVARIABLES>\n" +
            "</REQUESTDESC>";


    @Autowired
    private Services service;

    @PostMapping (value = "/createUser")
    public boolean createUser(@RequestBody UserDTO userData)
    {
        return service.createUser(userData);
    }

    @PostMapping (value = "/createOrder")
    public Long createOrder(@RequestBody OrderDTO orderData) throws Exception {
        return service.createOrder(orderData);
    }
    @PostMapping (value = "/updateOrder")
    public Long updateOrder(@RequestBody OrderDTO orderData) throws Exception {
        return service.updateOrder(orderData);
    }

    @PostMapping (value = "/createService")
    public Long createService(@RequestBody ServiceDTO serviceDTO) throws Exception {
        return service.createServiceOrder(serviceDTO);
    }

    @GetMapping (value = "/getOrders")
    public List<OrderDTO> getOrders(@RequestParam String type)
    {
        return service.getOrders(type);
    }
    @GetMapping (value = "/getOrder")
    public OrderDTO getOrder(@RequestParam long orderId)
    {
        return service.getOrder(orderId);
    }

    @GetMapping (value = "/delete")
    public boolean deleteOrders()
    {
        return service.deleteOrders();
    }

    @GetMapping (value = "/getServiceOrders")
    public List<ServiceDTO> getServiceOrders(@RequestParam String type)
    {
        return service.getServiceOrders(type);
    }

    @PostMapping (value = "/validateUser")
    public boolean validateUser(@RequestBody UserDTO userData)
    {
        return service.validateUser(userData);
    }

    @PostMapping(value = "/generateCode", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Resource> uploadFile(@RequestParam MultipartFile file, @RequestParam String sourceOption) throws IOException {
       System.out.println(file);

      //testMongoConnection();
        XSSFWorkbook workbook;

        ArrayList<TallyInputObject> inputList = null;
        try {
            workbook = new XSSFWorkbook(file.getInputStream());
            if(null!=workbook)
            {
                System.out.println("Workbook retrieved "+workbook.getNumberOfSheets());
                XSSFSheet worksheet = workbook.getSheetAt(0);
                System.out.println("Sheet retrieved "+worksheet.getSheetName());
                inputList = new ArrayList<>();
                DateFormat df = new SimpleDateFormat("yyyy/MM/dd");
                //I've Header and I'm ignoring header for that I've +1 in loop
                for(int i=worksheet.getFirstRowNum()+1;i<=worksheet.getLastRowNum();i++){
                    SfdcUserInputObject inputRow= new SfdcUserInputObject();
                    TallyInputObject input=new TallyInputObject();
                    Row ro=worksheet.getRow(i);
                    if(null !=ro && null !=ro.getCell(0)){
                    for(int j=ro.getFirstCellNum();j<=ro.getLastCellNum();j++) {
                        Cell ce = ro.getCell(j);
                        if (j == 0) {
                            Date date = ce.getDateCellValue();
                            String reportDate = df.format(date);
                            reportDate=reportDate.replaceAll("/","");
                            input.setDate(reportDate);

                        }
                        if (j == 1) {
                        }
                        if (j == 2) {
                            input.setDebit(ce.getStringCellValue());
                        }
                        if (j == 3) {
                            input.setCredit(ce.getStringCellValue());
                        }
                        if (j == 4) {
                            input.setAmount(String.valueOf(ce.getNumericCellValue()));
                        }
                        if (j == 5) {
                            input.setNarration(ce.getStringCellValue());
                        }
                        if (j == 6) {
                            input.setVoucherType(ce.getStringCellValue());
                        }


                    }
                        inputList.add(input);
                    }

                }


            }

        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        System.out.println(inputList);

        return generateFile(inputList);


    }


    public ResponseEntity<Resource> generateFile(ArrayList<TallyInputObject> inputList){


        createFile(inputList);
        File outputFile=new File(OUTPUT_FILE_PATH);
        String type=MediaType.TEXT_HTML_VALUE;
        HttpHeaders header = new HttpHeaders();
        header.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=img.txt");
        header.add("Cache-Control", "no-cache, no-store, must-revalidate");
        header.add("Pragma", "no-cache");
        header.add("Expires", "0");

        Path path = Paths.get(outputFile.getAbsolutePath());
        ByteArrayResource resource = null;
        try {
            resource = new ByteArrayResource(Files.readAllBytes(path));
        } catch (IOException e) {
            e.printStackTrace();
        }

        return ResponseEntity.ok()
                .headers(header)
                .contentLength(outputFile.length())
                .contentType(MediaType.parseMediaType(type))
                .body(resource);
    }

    private void createFile(ArrayList<TallyInputObject> inputList) {

        StringBuilder vouchersTemplate=new StringBuilder();
        StringBuilder ledgersTemplate=new StringBuilder();
        StringBuilder overallTemplate=new StringBuilder();

        for(TallyInputObject inputRow:inputList) {
           String voucherTemplate="<TALLYMESSAGE\n" +
                   "xmlns:UDF=\"TallyUDF\">\n" +
                   "<VOUCHER VCHTYPE=\"Payment\" ACTION=\"Create\">\n" +
                   "<VOUCHERTYPENAME>Payment</VOUCHERTYPENAME>\n" +
                   "<DATE>{date}</DATE>\n" +
                   "<PARTYLEDGERNAME>{partyledgername}</PARTYLEDGERNAME>\n" +
                   "<NARRATION>{narration}</NARRATION>\n" +
                   "<REFERENCE></REFERENCE>\n" +
                   "<VOUCHERNUMBER></VOUCHERNUMBER>\n" +
                   "<EFFECTIVEDATE>{date}</EFFECTIVEDATE>\n" +
                   "{ledgerlist}\n" +
                   "</VOUCHER>\n" +
                   "</TALLYMESSAGE>";

           String ledgerTemplate="<ALLLEDGERENTRIES.LIST>\n" +
                   "<REMOVEZEROENTRIES>No</REMOVEZEROENTRIES>\n" +
                   "<ISDEEMEDPOSITIVE>Yes</ISDEEMEDPOSITIVE>\n" +
                   "<LEDGERFROMITEM>No</LEDGERFROMITEM>\n" +
                   "<LEDGERNAME>{debit}</LEDGERNAME>\n" +
                   "<AMOUNT>- {amount}</AMOUNT>\n" +
                   "</ALLLEDGERENTRIES.LIST>\n" +
                   "<ALLLEDGERENTRIES.LIST>\n" +
                   "<REMOVEZEROENTRIES>No</REMOVEZEROENTRIES>\n" +
                   "<ISDEEMEDPOSITIVE>No</ISDEEMEDPOSITIVE>\n" +
                   "<LEDGERFROMITEM>No</LEDGERFROMITEM>\n" +
                   "<LEDGERNAME>{credit}</LEDGERNAME>\n" +
                   "<AMOUNT> {amount}</AMOUNT>\n" +
                   "</ALLLEDGERENTRIES.LIST>";
            voucherTemplate=  voucherTemplate.replaceAll("\\{date}",inputRow.getDate());
            voucherTemplate=  voucherTemplate.replaceFirst("\\{narration}",inputRow.getNarration());
            voucherTemplate=  voucherTemplate.replaceFirst("\\{partyledgername}",inputRow.getCredit());
            ledgerTemplate=  ledgerTemplate.replaceFirst("\\{debit}",inputRow.getDebit());
            ledgerTemplate=  ledgerTemplate.replaceFirst("\\{credit}",inputRow.getCredit());
            ledgerTemplate=  ledgerTemplate.replaceAll("\\{amount}",inputRow.getAmount());
            voucherTemplate=  voucherTemplate.replaceFirst("\\{ledgerlist}",ledgerTemplate);
            vouchersTemplate.append(voucherTemplate);
            vouchersTemplate.append("\n");
        }

        overallTemplate.append(envelope_Start_Tag);
        overallTemplate.append("\n");
        overallTemplate.append(headerTemplate);
        overallTemplate.append("\n");
        overallTemplate.append(body_Start_Tag);
        overallTemplate.append("\n");
        overallTemplate.append(importdata_Start_Tag);
        overallTemplate.append("\n");
        overallTemplate.append(requestDesc);
        overallTemplate.append("\n");
        overallTemplate.append(requestData_Start_Tag);
        overallTemplate.append("\n");
        overallTemplate.append(vouchersTemplate);
        overallTemplate.append("\n");
        overallTemplate.append(requestData_end_Tag);
        overallTemplate.append("\n");
        overallTemplate.append(importdata_End_Tag);
        overallTemplate.append("\n");
        overallTemplate.append(body_End_Tag);
        overallTemplate.append("\n");
        overallTemplate.append(envelope_End_Tag);
        try {
            File myObj = new File(OUTPUT_FILE_PATH);
            if (myObj.createNewFile()) {
                System.out.println("File created: " + myObj.getName());
            } else {
                System.out.println("File already exists.");
            }
            FileWriter myWriter = new FileWriter(OUTPUT_FILE_PATH);
            myWriter.write(overallTemplate.toString());
            myWriter.close();
            System.out.println("Successfully wrote to the file.");
        } catch (IOException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
        }
    }




}
