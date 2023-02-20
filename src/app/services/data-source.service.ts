import { Injectable } from '@angular/core';
import { loremIpsum } from 'lorem-ipsum';

export class ImageWithCaption {
	id: number;
	photo: string;
	text: string;

	constructor(id: number, photo: string = '', text: string = '') {
		this.id = id;
		this.photo = photo;
		this.text = text;
	}
}

@Injectable({
	providedIn: 'root',
})
export class DataSourceService {
	imageWithCaptionArr: Array<ImageWithCaption> = [];
	mockElements: number = 4000;
	mockWordsPerElem: number = 14; //Definimos para que esté accesible a tests

	constructor() {
		//Metemos en mockup los elementos, pero de normal los obtendríamos directamente en getData
		for (let i = 0; i < this.mockElements; i++) {
			this.imageWithCaptionArr.push(
				new ImageWithCaption(
					i,
					`https://picsum.photos/id/${i % 1000}/500/500`, // Resto de dividendo 1k porque en picsum no hay más id de imagen que 1000, así lo suplimos con repetición
					loremIpsum({
						count: this.mockWordsPerElem,
						units: 'words',
					})
				)
			);
		}
	}

	public getData(filter?: string): Array<ImageWithCaption> {
		//Originalmente iba a añadir paginación con infinite scroll pero he optado mejor por virtual scrolling
		return this.imageWithCaptionArr.filter((value) => {
			if (filter == undefined || filter.trim().length == 0) return true;
			const filterSanitized = filter.trim();

			if (isNaN(Number(filterSanitized))) {
				//toLowerCase para que sea case insensitive
				return value.text
					.toLowerCase()
					.includes(filterSanitized.toLowerCase());
			} else {
				return value.id === Number(filterSanitized);
			}
		});
	}
}
