package br.com.instituto.teresa.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MvcConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Libera qualquer requisição que comece com /uploads/ para ler a pasta local ./uploads/
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:./uploads/");
    }
}