import mongoose from 'mongoose';

const assistantSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    transcriber: { type: Object, required: true },
    model: { type: Object, required: true },
    voice: { type: Object, required: true },
    firstMessageMode: { type: String, enum: ['option1', 'option2'], required: true },
    recordingEnabled: { type: Boolean },
    hipaaEnabled: { type: Boolean },
    clientMessages: { type: [String] },
    serverMessages: { type: [String] },
    silenceTimeoutSeconds: { type: Number },
    responseDelaySeconds: { type: Number },
    llmRequestDelaySeconds: { type: Number },
    llmRequestNonPunctuatedDelaySeconds: { type: Number },
    numWordsToInterruptAssistant: { type: Number },
    maxDurationSeconds: { type: Number },
    backgroundSound: { type: String, enum: ['option1', 'option2'] },
    backchannelingEnabled: { type: Boolean },
    backgroundDenoisingEnabled: { type: Boolean },
    modelOutputInMessagesEnabled: { type: Boolean },
    transportConfigurations: { type: [Object] },
    firstMessage: { type: String },
    voicemailDetection: {
      provider: { type: String, enum: ['option1', 'option2'], required: true },
      voicemailDetectionTypes: { type: [String] },
      enabled: { type: Boolean },
      machineDetectionTimeout: { type: Number },
      machineDetectionSpeechThreshold: { type: Number },
      machineDetectionSpeechEndThreshold: { type: Number },
      machineDetectionSilenceTimeout: { type: Number },
    },
    voicemailMessage: { type: String },
    endCallMessage: { type: String },
    endCallPhrases: { type: [String] },
    metadata: { type: Object },
    serverUrl: { type: String },
    serverUrlSecret: { type: String },
    analysisPlan: {
      summaryPrompt: { type: String },
      summaryRequestTimeoutSeconds: { type: Number },
      structuredDataRequestTimeoutSeconds: { type: Number },
      successEvaluationPrompt: { type: String },
      successEvaluationRubric: { type: String, enum: ['option1', 'option2'] },
      successEvaluationRequestTimeoutSeconds: { type: Number },
      structuredDataPrompt: { type: String },
      structuredDataSchema: {
        type: { type: String, enum: ['option1', 'option2'], required: true },
        items: { type: Object },
        properties: { type: Object },
        description: { type: String },
        required: { type: [String] },
      },
    },
    artifactPlan: {
      videoRecordingEnabled: { type: Boolean },
    },
    messagePlan: {
      idleMessages: { type: [String] },
      idleMessageMaxSpokenCount: { type: Number },
      idleTimeoutSeconds: { type: Number },
    },
  },
  { timestamps: true }
);

export default mongoose.model('Assistant', assistantSchema);
