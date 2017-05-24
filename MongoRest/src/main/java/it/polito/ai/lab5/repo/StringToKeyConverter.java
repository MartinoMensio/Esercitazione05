package it.polito.ai.lab5.repo;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import it.polito.ai.lab5.entities.Key;

@Component
public class StringToKeyConverter implements Converter<String, Key> {

	@Override
	public Key convert(String source) {
		String[] parts = source.split("_");
		if (parts.length == 2) {
			Key key = new Key();
			key.setSrc(parts[0]);
			key.setDst(parts[1]);
			return key;
		} else {
			return null;
		}
	}

}
