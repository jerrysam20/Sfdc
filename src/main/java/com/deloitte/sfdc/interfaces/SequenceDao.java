package com.deloitte.sfdc.interfaces;

public interface SequenceDao {

    long getNextSequenceId(String key) throws Exception;

}