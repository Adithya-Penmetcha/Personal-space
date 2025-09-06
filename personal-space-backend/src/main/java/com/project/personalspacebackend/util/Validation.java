package com.project.personalspacebackend.util;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public class Validation {

    public static ResponseEntity<String> validateResumeContent(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No file uploaded.");
        }
        if (!"application/pdf".equals(file.getContentType())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Only PDF files are allowed.");
        }
        if (file.getSize() > 2 * 1024 * 1024) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("File size must be less than 2MB.");
        }
        return null;
    }
}
