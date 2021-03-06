package com.deloitte.sfdc.controller;


import com.deloitte.sfdc.dto.OrderDTO;
import com.deloitte.sfdc.dto.ServiceDTO;
import com.deloitte.sfdc.dto.SfdcUserInputObject;
import com.deloitte.sfdc.dto.UserDTO;
import com.deloitte.sfdc.interfaces.Services;

import org.apache.commons.lang3.StringUtils;
import org.apache.poi.ss.usermodel.Cell;
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
import java.util.ArrayList;
import java.util.List;


@RestController
public class SFDCController {

    private static final String OUTPUT_FILE_PATH="src/main/resources/reports/sample.txt";
    private static final String outputHeader="<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
            "<Workflow xmlns=\"http://soap.sforce.com/2006/04/metadata\">";
    private static final String outputFooter="</Workflow>";


    @Autowired
    private Services service;

    @PostMapping (value = "/createUser")
    public boolean createUser(@RequestBody UserDTO userData)
    {
        return service.createUser(userData);
    }

    @PostMapping (value = "/createOrder")
    public boolean createOrder(@RequestBody OrderDTO orderData)
    {
        return service.createOrder(orderData);
    }

    @PostMapping (value = "/createService")
    public boolean createService(@RequestBody ServiceDTO serviceDTO)
    {
        return service.createServiceOrder(serviceDTO);
    }

    @GetMapping (value = "/getOrders")
    public List<OrderDTO> getOrders(@RequestParam String type)
    {
        return service.getOrders(type);
    }
    @GetMapping (value = "/getOrder")
    public OrderDTO getOrder(@RequestParam String orderId)
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
        ArrayList<SfdcUserInputObject> inputList = null;
        try {
            workbook = new XSSFWorkbook(file.getInputStream());
            if(null!=workbook)
            {
                System.out.println("Workbook retrieved "+workbook.getNumberOfSheets());
                XSSFSheet worksheet = workbook.getSheetAt(3);
                System.out.println("Sheet retrieved "+worksheet.getSheetName());
                inputList = new ArrayList<>();
                //I've Header and I'm ignoring header for that I've +1 in loop
                for(int i=worksheet.getFirstRowNum()+1;i<=worksheet.getLastRowNum();i++){
                    SfdcUserInputObject inputRow= new SfdcUserInputObject();
                    Row ro=worksheet.getRow(i);
                    if(null !=ro && null !=ro.getCell(0) && ro.getCell(0).getStringCellValue().equals("Object")){
                    for(int j=ro.getFirstCellNum();j<=ro.getLastCellNum();j++) {
                        Cell ce = ro.getCell(j);
                        if (j == 0) {
                            //If you have Header in text It'll throw exception because it won't get NumericValue
                            inputRow.setObject(ce.getStringCellValue());
                        }
                        if (j == 1) {
                            inputRow.setRuleName(ce.getStringCellValue());
                        }
                        if (j == 2) {
                            inputRow.setDescription(ce.getStringCellValue());
                        }
                        if (j == 3) {
                            inputRow.setEvalCriteria(ce.getStringCellValue());
                        }
                        if (j == 4) {
                            inputRow.setRuleCriteria(ce.getStringCellValue());
                        }
                        if (j == 5) {
                            inputRow.setCriteria(ce.getStringCellValue());
                        }
                        if (j == 6) {
                            inputRow.setSpecifyWorkflowAction(ce.getStringCellValue());
                        }
                        if (j == 7) {
                            inputRow.setAddWorkFlowAction(ce.getStringCellValue());
                        }
                        if (j == 8) {
                            inputRow.setActionName(ce.getStringCellValue());
                        }
                        if (j == 9) {
                            inputRow.setName(ce.getStringCellValue());
                        }
                        if (j == 10) {
                            inputRow.setUniqueName(ce.getStringCellValue());
                        }
                        if (j == 11) {
                            inputRow.setWorkflowDescription(ce.getStringCellValue());
                        }
                        if (j == 13) {
                            inputRow.setFieldToUpdate(ce.getStringCellValue());
                        }
                        if (j == 14) {
                            inputRow.setReevaluateWorkflowOptions(ce.getStringCellValue());
                        }
                        if (j == 15) {
                            inputRow.setNewFieldValue(ce.getStringCellValue());
                        }
                        if (j == 16) {
                            inputRow.setFormulaEditor(ce.getStringCellValue());
                        }

                    }
                        inputList.add(inputRow);
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


    public ResponseEntity<Resource> generateFile(ArrayList<SfdcUserInputObject> inputList){


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

    private void createFile(ArrayList<SfdcUserInputObject> inputList) {

        StringBuilder fieldsTemplate=new StringBuilder();
        StringBuilder rulesTemplate=new StringBuilder();
        StringBuilder overallTemplate=new StringBuilder();

        for(SfdcUserInputObject inputRow:inputList){
            String fieldtemplate="<fieldUpdates>\n" +
                    "        <fullName>{fullname}</fullName>\n" +
                    "        <description>{description}</description>\n" +
                    "        <field>{field}</field>\n" +
                    "        <literalValue>{literalvalue}</literalValue>\n" +
                    "        <formula>{formula}<formula>\n" +
                    "        <name>{name}</name>\n" +
                    "        <notifyAssignee>{notifyassignee}</notifyAssignee>\n" +
                    "        <operation>{operation}</operation>\n" +
                    "        <protected>{protected}</protected>\n" +
                    "    </fieldUpdates>";

            String ruleTemplate=" <rules>\n" +
                    "        <fullName>{fullname}</fullName>\n" +
                    "        <actions>\n" +
                    "            <name>{actionname}</name>\n" +
                    "            <type>{actiontype}</type>\n" +
                    "        </actions>\n" +
                    "        <active>{active}</active>\n" +
                    "        <criteriaItems>\n" +
                    "            <field>{criteriafield}</field>\n" +
                    "            <operation>{criteriaoperation}</operation>\n" +
                    "        </criteriaItems>\n" +
                    "        <description>{workflowdescription}</description>\n" +
                    "        <triggerType>{triggertype}</triggerType>\n" +
                    "    </rules>\n" +
                    "    ";
            fieldtemplate=  fieldtemplate.replaceFirst("\\{fullname}",inputRow.getUniqueName());
            fieldtemplate=  fieldtemplate.replaceFirst("\\{description}",inputRow.getWorkflowDescription());
            fieldtemplate=  fieldtemplate.replaceFirst("\\{field}",inputRow.getFieldToUpdate());
            fieldtemplate=  fieldtemplate.replaceFirst("\\{literalvalue}",inputRow.getNewFieldValue());
            fieldtemplate=  fieldtemplate.replaceFirst("\\{formula}",inputRow.getFormulaEditor());
            fieldtemplate= fieldtemplate.replaceFirst("\\{name}",inputRow.getName());
            fieldtemplate= fieldtemplate.replaceFirst("\\{notifyassignee}","false");
            if(StringUtils.isNotEmpty(inputRow.getNewFieldValue())) {
                fieldtemplate=  fieldtemplate.replaceFirst("\\{operation}", "Literal");
            }
            else if(StringUtils.isNotEmpty(inputRow.getFormulaEditor())) {
                fieldtemplate=   fieldtemplate.replaceFirst("\\{operation}", "Formula");
            }
            else{
                fieldtemplate=   fieldtemplate.replaceFirst("\\{operation}", "");
            }
            fieldtemplate= fieldtemplate.replaceFirst("\\{protected}","false");
            fieldsTemplate.append(fieldtemplate);
            fieldsTemplate.append("\n");
            ruleTemplate=   ruleTemplate.replaceFirst("\\{fullname}",inputRow.getRuleName());
            ruleTemplate=   ruleTemplate.replaceFirst("\\{actionname}",inputRow.getUniqueName());
            ruleTemplate=   ruleTemplate.replaceFirst("\\{actiontype}","FieldUpdate");
            ruleTemplate=   ruleTemplate.replaceFirst("\\{active}","true");
            ruleTemplate=   ruleTemplate.replaceFirst("\\{criteriafield}",inputRow.getFieldToUpdate());
            if(inputRow.getCriteria().contains("!=")){
                ruleTemplate=   ruleTemplate.replaceFirst("\\{criteriaoperation}","notEqual");
            }else {
                ruleTemplate = ruleTemplate.replaceFirst("\\{criteriaoperation}", "equals");
            }
            ruleTemplate=   ruleTemplate.replaceFirst("\\{workflowdescription}",inputRow.getDescription());
            if(inputRow.getEvalCriteria().equals("created")) {
                ruleTemplate = ruleTemplate.replaceFirst("\\{triggertype}", "onCreateOnly");
            }
            else if(inputRow.getEvalCriteria().equals("created, and everytime it's edited")) {
                ruleTemplate = ruleTemplate.replaceFirst("\\{triggertype}", "onAllChanges");
            }
            else if(inputRow.getEvalCriteria().equals("created, and any time it's edited to subsequently meet criteria")) {
                ruleTemplate = ruleTemplate.replaceFirst("\\{triggertype}", "onCreateOrTriggeringUpdate");
            }
            rulesTemplate.append(ruleTemplate);
            rulesTemplate.append("\n");
        }
        overallTemplate.append(outputHeader);
        overallTemplate.append("\n");
        overallTemplate.append(fieldsTemplate);
        overallTemplate.append(rulesTemplate);
        overallTemplate.append(outputFooter);

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
