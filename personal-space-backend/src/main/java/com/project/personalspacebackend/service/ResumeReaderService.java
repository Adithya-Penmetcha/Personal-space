package com.project.personalspacebackend.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class ResumeReaderService {

    private final ChatClient chatClient;

    @Autowired
    public ResumeReaderService(ChatClient chatClient) {
        this.chatClient = chatClient;
    }

    public String parsePdf(MultipartFile file) throws IOException {
        try (PDDocument document = PDDocument.load(file.getBytes())) {
            PDFTextStripper pdfStripper = new PDFTextStripper();
            return pdfStripper.getText(document);
        }
    }

    public String extractResumeInfo(String parsedText) {
        String prompt = "Extract the following information from this resume text and return a JSON object with the structure {name:\"\", email:\"\", experience:[\"\"]}. If experience has multiple lines, return them as an array of points. Resume text:\n" + parsedText;
        return chatClient.prompt().user(prompt).call().content();
    }
}
