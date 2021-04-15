package com.deloitte.sfdc.dto;

import java.util.List;

public class TallyInputObject {

    private String date;
    private String voucherNumber;
    private List<DebitVO> debitList;
    private List<CreditVO> creditList;
    private String narration;
    private String voucherType;

    public List<DebitVO> getDebitList() {
        return debitList;
    }

    public void setDebitList(List<DebitVO> debitList) {
        this.debitList = debitList;
    }

    public List<CreditVO> getCreditList() {
        return creditList;
    }

    public void setCreditList(List<CreditVO> creditList) {
        this.creditList = creditList;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getVoucherNumber() {
        return voucherNumber;
    }

    public void setVoucherNumber(String voucherNumber) {
        this.voucherNumber = voucherNumber;
    }


    public String getNarration() {
        return narration;
    }

    public void setNarration(String narration) {
        this.narration = narration;
    }

    public String getVoucherType() {
        return voucherType;
    }

    public void setVoucherType(String voucherType) {
        this.voucherType = voucherType;
    }
}
