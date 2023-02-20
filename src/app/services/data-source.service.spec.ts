import { TestBed } from '@angular/core/testing';

import { DataSourceService, ImageWithCaption } from './data-source.service';

describe('DataSourceService', () => {
	let service: DataSourceService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(DataSourceService);

		//Vamos a reducir el set de datos para agilizar
		service.mockElements = 50;
		service.imageWithCaptionArr = service.imageWithCaptionArr.splice(0, 50);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should populate the array successfully', () => {
		expect(service.imageWithCaptionArr).toHaveSize(service.mockElements);
	});

	it('should return the data on method call', () => {
		expect(service.getData()).toEqual(service.imageWithCaptionArr);
	});

	it('should add items with the correct structure', () => {
		service.imageWithCaptionArr.forEach((item) => {
			expect(item).toBeInstanceOf(ImageWithCaption);
		});
	});

	it('should add items with a defined, positive integer, id property', () => {
		service.imageWithCaptionArr.forEach((item) => {
			expect(item.id).toBeGreaterThanOrEqual(0);
		});
	});

	it('should add items with a correct, id-relevant, url on photo property', () => {
		service.imageWithCaptionArr.forEach((item) => {
			expect(item.photo).toBe(
				`https://picsum.photos/id/${item.id % 1000}/500/500`
			);
		});
	});

	it('should create the lipsum text with the correct attributes specified', () => {
		//En este caso, item.text debe contener tantas palabras como indique service.mockWordsPerElem
		const regex = new RegExp(
			`^\\W*(\\w+\\b\\W*){${service.mockWordsPerElem}}$`
		);
		service.imageWithCaptionArr.forEach((item) => {
			expect(item.text).toMatch(regex);
		});
	});

	//Comprobar que el filtro funciona, directamente desde aquí, añadimos al menos 1 elemento la palabra lorem y comprobamos que hay 1 o más elementos con esa palabra, para asegurarnos de que el filtro funciona
	it('should filter the dataset correctly when filter property is provided', () => {
		//Metemos un elemento para que nos aseguremos de que al menos exista. Al ser random, cabe la posibilidad, aunque muy baja.
		service.imageWithCaptionArr.push(
			new ImageWithCaption(
				500,
				'https://picsum.photos/id/500/500/500',
				'Lorem Ipsum TESTING'
			)
		);

		expect(service.getData('lorem').length).toBeGreaterThanOrEqual(1);
		expect(service.getData('testing')).toHaveSize(1); //Sólo este último coincide
		expect(service.getData('11')).toHaveSize(1); //Por id
		expect(service.getData('testing testing')).toHaveSize(0);
	});
});
