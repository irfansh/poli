package com.shzlw.poli.dto;

import java.util.List;

import com.shzlw.poli.model.Component;
import com.shzlw.poli.model.Report;

public class ImportedReport {
	private Report report;
	private List<Component> components;
	
	public Report getReport() {
		return report;
	}
	public void setReport(Report report) {
		this.report = report;
	}
	public List<Component> getComponents() {
		return components;
	}
	public void setComponents(List<Component> components) {
		this.components = components;
	}
	
}
