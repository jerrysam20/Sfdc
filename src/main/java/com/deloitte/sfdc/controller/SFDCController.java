package com.deloitte.sfdc.controller;


import com.deloitte.sfdc.dto.SfdcUserInputObject;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;


@RestController
public class SFDCController {

    private static final String REPORT_FILE_PATH="src/main/resources/reports/output.txt";

    String template1="<fieldUpdates>\n" +
            "        <fullName>{{fullname}}</fullName>\n" +
            "        <description>{{description}}</description>\n" +
            "        <field>{{field}}</field>\n" +
            "        <literalValue>{{literalvalue}}</literalValue>\n" +
            "        <name>{{name}}</name>\n" +
            "        <notifyAssignee>{{notifyassignee}}</notifyAssignee>\n" +
            "        <operation>{{operation}}</operation>\n" +
            "        <protected>{{protected}}</protected>\n" +
            "    </fieldUpdates>" +
            "";


    String template2=" <rules>\n" +
            "        <fullName>{{fullname}}</fullName>\n" +
            "        <actions>\n" +
            "            <name>{{actionname}}</name>\n" +
            "            <type>{{actiontype}}</type>\n" +
            "        </actions>\n" +
            "        <active>{{active}}</active>\n" +
            "        <criteriaItems>\n" +
            "            <field>{{criteriafield}}</field>\n" +
            "            <operation>{{criteriaoperation}}</operation>\n" +
            "        </criteriaItems>\n" +
            "        <description>{{workflowdescription}}</description>\n" +
            "        <triggerType>{{triggertype}}</triggerType>\n" +
            "    </rules>";




    @PostMapping(value = "/generateCode", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Resource> uploadFile(@RequestParam MultipartFile file, @RequestParam String sourceOption) throws IOException {
       System.out.println(file);


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
                            inputRow.setFieldToUpdate(ce.getStringCellValue());
                        }
                        if (j == 12) {
                            inputRow.setReevaluateWorkflowOptions(ce.getStringCellValue());
                        }
                        if (j == 13) {
                            inputRow.setNewFieldValue(ce.getStringCellValue());
                        }
                        if (j == 14) {
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

        return generateFile();


    }


    public ResponseEntity<Resource> generateFile(){
        File outputFile=new File(REPORT_FILE_PATH);
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


}
