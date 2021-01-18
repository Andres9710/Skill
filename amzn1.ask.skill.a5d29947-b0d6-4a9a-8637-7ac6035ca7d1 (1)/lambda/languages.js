module.exports = {
    en: {
        translation: {
            WELCOME_MSG: 'Hello, i am Donna. i will guide you while you choose the actions you want to do!',
            WELCOME_MSG_NAME: 'what a pleasure {{nombre}}, tell me, what you wnat to do?  some options are create a new contact, create an apointment or tell me my next appointment',
            MEETING_MSG_DATE: 'You made an appoinment at {{dia}} of {{month}} of {{year}} with {{cliente}} in {{direccion}}, the name of you appoinment is {{titulo_cita}} and it is {{tipo_cita}} type, if you want to create a new meeting just say create a new meeting, if you want to create a contact say create a new contact otherwise say Alexa Stop.',
            GOODBYE_MSG: 'see you later {{nombre}}! have a nice day.',
            REFLECTOR_MSG: 'You Just triggered {{intent}}',
            FALLBACK_MSG: 'Sorry, I dont know about that. please try again. ',
            ERROR_MSG: 'sorry, there was a problem. please try again. ',
            REPROMPT_MSG: 'if you dont know how to keep going just say help. if you want to quit say stop or bye? ',
            ADD_CONTACT_MSG: 'you added a contact named {{contacto}}, his phone number is {{telefono_contacto}} and his relationship with the company is {{relacion}}, if you want to add a new contact just say create a new contact, otherwise say Alexa stop and you gonna quit from this skill',
            MISSING_ATR: 'There is not any appoinment schedule',
            DAYS_LEFT_MSG: `There's {{count}} day left `,
            DAYS_LEFT_MSG_plural: 'There are {{count}} days left ',
        }
    },
    es: {
        translation: {
            WELCOME_MSG: 'Hola, soy donna, Bienvenido. te guiaré mientras seleccionas las acciones que deseas hacer!',
            WELCOME_MSG_NAME: 'Mucho gusto, {{nombre}}, dime que deseas hacer? algunas opciones pueden ser crear una cita o reservar una fecha, crear un contacto, dame detalles de la siguiente cita',
            MEETING_MSG_DATE: 'Has agendado una cita para el dia {{dia}} del mes {{month}} del año {{year}} con {{cliente}} en {{direccion}}, en nombre de tu cita es {{titulo_cita}} y es de tipo {{tipo_cita}} si deseas agregar otra cita debes decir crear una cita, si deseas crear un contacto di crear un contacto, si deseas salir di alexa para.',
            GOODBYE_MSG: 'Hasta luego {{nombre}}! que tengas un excelente día',
            REFLECTOR_MSG: 'Acabas de activar {{intent}}',
            FALLBACK_MSG: 'Lo siento, no se nada sobre eso. Por favor inténtalo otra vez. ',
            ERROR_MSG: 'Lo siento, ha habido un problema. Por favor inténtalo otra vez. ',
            REPROMPT_MSG: 'Si no sabes como continuar intent pedir ayuda. Si quieres salir solo dí para. Qué quieres hacer? ',
            ADD_CONTACT_MSG: 'Tu contacto ha sido agregado con el nombre {{contacto}} y numero de telefono {{telefono_contacto}} y su relación con la empresa es {{relacion}}, si deseas agregar otro contacto di crear contacto, caso contrario di Alexa para y saldrás de esta skill',
            MISSING_ATR: 'No existen citas pendientes por el momento',
            DAYS_LEFT_MSG: 'Queda {{count}} día para tu cita con {{cliente}} en {{direccion}}',
            DAYS_LEFT_MSG_plural: 'Quedan {{count}} días para tu cita con {{cliente}} en {{direccion}}',
        }
    }
}