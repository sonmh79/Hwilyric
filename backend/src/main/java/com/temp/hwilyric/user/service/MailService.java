package com.temp.hwilyric.user.service;

import com.temp.hwilyric.exception.NotFoundException;
import com.temp.hwilyric.user.dto.MailDto;
import com.temp.hwilyric.user.handler.MailHandler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.MessagingException;
import java.util.Random;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MailService {

    private final JavaMailSender javaMailSender;

    public MailDto createMail(String email) {

        String code = createKey(); // 인증코드 생성

        String msg = "";
        msg += "<div style='margin: 20px; width: 70%; text-align: center'>";
        msg += "<hr style='border: solid 5px #fbd5e0'/>";
        msg += "<br />";
        msg += "<br />";
        msg += "<img style='width: 15%' src='https://drive.google.com/file/d/1qILXGmoECJrsD9GJT5ag-DBchvt-EYJu/view?usp=sharing'/>"; // 해당 경로는 S3에 올린 후 변경 예정
        msg += "<h1>인증코드 안내 관련 이메일 입니다.</h1>";
        msg += "<br />";
        msg += "<br />";
        msg += "<p>안녕하세요.</p>";
        msg += "<p>휘리릭을 이용해 주셔서 진심으로 감사드립니다.</p>";
        msg += "<p>아래 코드를 입력하여 회원가입을 완료해 주세요.</p>";
        msg += "<br />";
        msg += "<div style='margin: 0 auto; text-align: center; width: 300px; border: 1px solid black; font-family: verdana; padding: 10px;'>";
        msg += "<div style='color: #765790; font-size: 130%'><strong>";
        msg += code + "</strong></div>";
        msg += "</div>";
        msg += "</div>";

        MailDto mailDto = new MailDto();

        mailDto.setAddress(email);
        mailDto.setTitle("[HWILYric] 이메일 인증코드를 확인해주세요.");
        mailDto.setMessage(msg);
        mailDto.setCode(code);
        return mailDto;
    }

    // 인증코드 생성
    public static String createKey() {
        StringBuffer key = new StringBuffer();
        Random rnd = new Random();

        for (int i = 0; i < 6; i++) { // 인증코드 8자리
            int index = rnd.nextInt(3); // 0~2 까지 랜덤

            switch (index) {
                case 0:
                    key.append((char) ((int) (rnd.nextInt(26)) + 97));
                    //  a~z  (ex. 1+97=98 => (char)98 = 'b')
                    break;
                case 1:
                    key.append((char) ((int) (rnd.nextInt(26)) + 65));
                    //  A~Z
                    break;
                case 2:
                    key.append((rnd.nextInt(10)));
                    // 0~9
                    break;
            }
        }
        return key.toString();
    }

    public void sendEmail(MailDto mailDto) throws NotFoundException, MessagingException {
        MailHandler mailHandler = new MailHandler(javaMailSender);

        mailHandler.setTo(mailDto.getAddress());
        mailHandler.setSubject(mailDto.getTitle());
        mailHandler.setText(mailDto.getMessage(), true);
        mailHandler.send();
    }

}
