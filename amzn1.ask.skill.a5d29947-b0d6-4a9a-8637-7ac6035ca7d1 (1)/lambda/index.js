/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');

const language_strings = require('./languages');
const moment = require('moment-timezone');
const interceptors = require('./interceptors');
//const persistence = require('./persistence');

/**
 *Esta funcion es la encargada de la conexcion con la base de datos
 * En este caso estamos usando S3 que es autogestionada por lambda
 * esto nos facilita el manejo de los datos
 */
function getPersistenceAdapter() {
    // This function is an indirect way to detect if this is part of an Alexa-Hosted skill
        function isAlexaHosted() {
            return process.env.S3_PERSISTENCE_BUCKET;
        }
        if (isAlexaHosted()) {
            const {S3PersistenceAdapter} = require('ask-sdk-s3-persistence-adapter');
            return new S3PersistenceAdapter({
                bucketName: process.env.S3_PERSISTENCE_BUCKET
            });
        }
    }

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        
        const speechText = handlerInput.t('WELCOME_MSG');
        const repromptText = 'dime tu nombre';
        
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(repromptText)
            .addDelegateDirective({
                name: 'MenuIntent',
                confirmationStatus: 'NONE',
                slots: {}
            })
            .getResponse();
    }
};


const MenuIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'MenuIntent';
    },
    handle(handlerInput) {
        const {attributesManager, requestEnvelope} = handlerInput;
        // the attributes manager allows us to access session attributes
        const sessionAttributes = attributesManager.getSessionAttributes();
        const {intent} = requestEnvelope.request;
        const nombre = Alexa.getSlotValue(requestEnvelope, 'nombre');
            sessionAttributes['nombre'];
        let speechText = '';
        speechText += handlerInput.t('WELCOME_MSG_NAME', {nombre: nombre});

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt('debes decir alguna de las opciones de arriba')
            .getResponse();
    }
};



const RegistrarContactoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'RegistrarContactoIntent';
    },
    handle(handlerInput) {
        const {attributesManager, requestEnvelope} = handlerInput;
        // the attributes manager allows us to access session attributes
        const sessionAttributes = attributesManager.getSessionAttributes();
        const {intent} = requestEnvelope.request;
        
        const contacto = Alexa.getSlotValue(requestEnvelope, 'contacto');
        const telefono_contacto = Alexa.getSlotValue(requestEnvelope, 'telefono');
        const relacion = Alexa.getSlotValue(requestEnvelope, 'relacion')
          
        let speechText ='';
        sessionAttributes['contacto'] = contacto;
        sessionAttributes['telefono_contacto'] = telefono_contacto;
        speechText = handlerInput.t('ADD_CONTACT_MSG', {contacto:contacto , telefono_contacto: telefono_contacto, relacion:relacion});
        
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt('si deseas agregar otro contacto di crea un contacto')
            .getResponse();
    }
};


const RegistrarCitaIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'RegistrarCitaIntent';
    },
    handle(handlerInput) {
        const {attributesManager, requestEnvelope} = handlerInput;
        // the attributes manager allows us to access session attributes
        const sessionAttributes = attributesManager.getSessionAttributes();
        const {intent} = requestEnvelope.request;
        
        const dia = Alexa.getSlotValue(requestEnvelope, 'day');
        const mes = Alexa.getSlotValue(requestEnvelope, 'month');
        const year = Alexa.getSlotValue(requestEnvelope, 'year');
        const cliente = Alexa.getSlotValue(requestEnvelope, 'cliente');
        const direccion = Alexa.getSlotValue(requestEnvelope, 'direccion');
        const titulo_cita = Alexa.getSlotValue(requestEnvelope, 'titulo_cita');
        const tipo_cita = Alexa.getSlotValue(requestEnvelope, 'tipo_cita');
        
        //const hora = Alexa.getSlotValue(requestEnvelope, 'hora');
        
        sessionAttributes['dia'] = dia;
        sessionAttributes['mes'] = mes;
        sessionAttributes['year'] = year;
        sessionAttributes['cliente'] = cliente;

        
        //sessionAttributes['hora'] = hora;
        const timezone = 'America/Ecuador'; // provide yours here. we'll change this later to retrieve the timezone from the device
        const today = moment().tz(timezone).startOf('dia');
        const nextMeeting = moment(`${mes}/${dia}/${today.year()}`, "MM/DD/YYYY").tz(timezone).startOf('dia');
        
        if(today.isAfter(nextMeeting)){ // esto es si la cita es despues de la fecha que nos solicitaron
            speechText = handlerInput.t('GREET_MSG');
        }
        
        let speechText = handlerInput.t('MEETING_MSG_DATE', {dia: dia,month:mes,year:year, cliente:cliente, direccion: direccion, titulo_cita:titulo_cita, tipo_cita: tipo_cita});  

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt('Si quiere crear otra cita diga crear una cita')
            .getResponse();
    }
};

const DecirCitaIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'DecirCitaIntent';
    },
    handle(handlerInput) {
        const {attributesManager, requestEnvelope} = handlerInput;
        // the attributes manager allows us to access session attributes
        const sessionAttributes = attributesManager.getSessionAttributes();
        const {intent} = requestEnvelope.request;
        
        const dia = sessionAttributes['dia'];
        const mes = sessionAttributes['mes'];
        const year = sessionAttributes['year'];
        const cliente = sessionAttributes['cliente'];
        const direccion = sessionAttributes['direccion'];
        const titulo_cita = sessionAttributes['titulo_cita'];
        const tipo_cita = sessionAttributes['tipo_cita'];
        
        
        let speechText = '';
        const dateAvailable = dia && mes && year;
        if (dateAvailable){
            const timezone = 'America/Ecuador'; // provide yours here. we'll change this later to retrieve the timezone from the device
            const today = moment().tz(timezone).startOf('dia');
            const nextMeeting = moment(`${mes}/${dia}/${today.year()}`, "MM/DD/YYYY").tz(timezone).startOf('dia');
            const daysUntilMeeting = nextMeeting.startOf('dia').diff(today, 'dias'); // same days returns 0
            
            
            speechText = handlerInput.t('DAYS_LEFT_MSG', {count: daysUntilMeeting, cliente:cliente , direccion: direccion});
            if (daysUntilMeeting === 0) { // si es que ya es el dia de la cita
                speechText = handlerInput.t('GREET_MSG', {count: dia, cliente:cliente , direccion: direccion});
            }
        } else {
            speechText = handlerInput.t('MISSING_ATR')+'quiere agregar una?';
        }
        return handlerInput.responseBuilder
        .speak(speechText)
        .getResponse();
    }
};


const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = handlerInput.t('HELP_MSG');

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(handlerInput.t('HELP_MSG'))
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const {attributesManager, requestEnvelope} = handlerInput;
        const sessionAttributes = attributesManager.getSessionAttributes();
        const {intent} = requestEnvelope.request;
        
        const nombre = Alexa.getSlotValue(requestEnvelope,'nombre');
        const speechText = handlerInput.t('GOODBYE_MSG', {nombre:nombre});

        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};



/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        RegistrarContactoIntentHandler,
        MenuIntentHandler,
        RegistrarCitaIntentHandler,
        DecirCitaIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .addRequestInterceptors(
        interceptors.LocalisationRequestInterceptor,
        interceptors.LoggingRequestInterceptor,
        interceptors.LoadAttributesRequestInterceptor)
    .addResponseInterceptors(
        interceptors.LoggingResponseInterceptor,
        interceptors.SaveAttributesResponseInterceptor)
    .withPersistenceAdapter(getPersistenceAdapter())
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();