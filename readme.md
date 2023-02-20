# Prueba de código para Sanitas

## Resumen requisitos

Respecto a lo indicado en el pdf:

> Generar Array o Json random de 4k elementos con una estructura de `[ { id: id_imagen, photo: url_photo, text: random_lorem_ipsum_text }, ... ]`
>
> Mostrar en pantalla los 4k elementos con rendimiento óptimo, mostrando la imagen y el texto valorando la maquetación
>
> Añadir un filtro que permita buscar por id de imagen y por el texto
>
> Tests unitarios obligatorios, se valora positivamente el uso de E2E

## Notas

-   Dado que me comentaron que el proyecto es con cordova, he especificado el flag de `--cordova` en la instancia del proyecto para crearlo de ese modo. No importa demasiado porque no se va a hacer compilación, pero simplemente para poder recordar yo mismo que no usamos capacitor en este
-   La URL ha cambiado ligeramente, el subdominio `i.pic...` no parece funcionar. He mirado y es porque al acceder redirige a `fastly.picsum.photos`. Además añade un parámetro `hmac` que requiere sí o también, así que he cambiado la llamada a la misma url sin subdominio.
-   También hay un problema con que las imágenes ahora sólo van hasta el id 1000. Así que he hecho un pequeño ajuste en el código para no mostrar imágenes rotas porque el id no existe. También hay algún id como el 463 que tampoco existe, así que he añadido un fallback de imagen placeholder.
-   Respecto a los tests, estoy más acostumbrado a tests unitarios en otros lenguajes, pero no es mayor problema. Eso sí, no he tocado demasiado de testing E2E, conozco un poco de cypress pero no he incluido ninguno de momento por no poder dar la misma calidad de código que el resto, pero si fuesen requeridos para el puesto no tengo problema en mirarlos más en profundidad
-   También, aunque menos importante, suelo indentar con tabs de 4, pero es preferencia personal, me adapto a estilos de código que tenga la empresa sin problema

## TO-DO

-   Aumentar el coverage de tests unitarios, actualmente:
    ```
    Statements   : 100% ( 30/30 )
    Branches     : 80% ( 8/10 )
    Functions    : 100% ( 8/8 )
    Lines        : 100% ( 28/28 )
    ```
-   Añadir tests E2E
