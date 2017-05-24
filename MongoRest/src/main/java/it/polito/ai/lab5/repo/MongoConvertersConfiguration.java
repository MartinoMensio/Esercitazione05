package it.polito.ai.lab5.repo;

import javax.annotation.Resource;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.support.GenericConversionService;

@Configuration
public class MongoConvertersConfiguration {

	@Resource(name = "defaultConversionService")
	private GenericConversionService genericConversionService;

	@Bean
	public StringToKeyConverter string2MongoUserConverter() {
		StringToKeyConverter string2MongoUserConverter = new StringToKeyConverter();
		genericConversionService.addConverter(string2MongoUserConverter);
		return string2MongoUserConverter;
	}

}
