package com.project.personalspacebackend.controller;

import com.project.personalspacebackend.util.Validation;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import com.project.personalspacebackend.service.ResumeReaderService;

@RestController
@RequestMapping("/api/resume")
public class ResumeReader {

    @Autowired
    private ResumeReaderService resumeReaderService;

    @PostMapping("/read")
    public ResponseEntity<String> readResume(@RequestParam("file") MultipartFile file) {
        ResponseEntity<String> validationResponse = Validation.validateResumeContent(file);
        if (validationResponse != null) {
            return validationResponse;
        }
        try {
            String json = resumeReaderService.extractResumeInfo(resumeReaderService.parsePdf(file));
            return ResponseEntity.ok(json);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to parse PDF or extract info.");
        }
    }
}
