export interface Root {
    openapi: string
    paths: Paths
    info: Info
    tags: Tag[]
    servers: any[]
    components: Components
}

export interface Paths {
    "/": GeneratedType
    "/chatgpt/send": ChatgptSend
    "/time": Time
    "/conversation/save": ConversationSave
    "/conversation/load/{id}": ConversationLoadId
    "/heartbeat": Heartbeat
    "/ollama/query": OllamaQuery
    "/ollama/models": OllamaModels
}

export interface GeneratedType {
    get: Get
}

export interface Get {
    operationId: string
    parameters: any[]
    responses: Responses
    tags: string[]
}

export interface Responses {
    "200": N200
}

export interface N200 {
    description: string
}

export interface ChatgptSend {
    post: Post
}

export interface Post {
    operationId: string
    parameters: any[]
    responses: Responses2
    tags: string[]
}

export interface Responses2 {
    "201": N201
}

export interface N201 {
    description: string
}

export interface Time {
    get: Get2
}

export interface Get2 {
    operationId: string
    parameters: any[]
    responses: Responses3
}

export interface Responses3 {
    default: Default
}

export interface Default {
    description: string
    content: Content
}

export interface Content {
    "application/json": ApplicationJson
}

export interface ApplicationJson {
    schema: Schema
}

export interface Schema {
    type: string
    properties: Properties
}

export interface Properties {
    currentTime: CurrentTime
}

export interface CurrentTime {
    type: string
    format: string
}

export interface ConversationSave {
    post: Post2
}

export interface Post2 {
    operationId: string
    parameters: any[]
    responses: Responses4
    tags: string[]
}

export interface Responses4 {
    "201": N2012
}

export interface N2012 {
    description: string
}

export interface ConversationLoadId {
    get: Get3
}

export interface Get3 {
    operationId: string
    parameters: Parameter[]
    responses: Responses5
    tags: string[]
}

export interface Parameter {
    name: string
    required: boolean
    in: string
    schema: Schema2
}

export interface Schema2 {
    type: string
}

export interface Responses5 {
    "200": N2002
}

export interface N2002 {
    description: string
}

export interface Heartbeat {
    get: Get4
}

export interface Get4 {
    operationId: string
    parameters: any[]
    responses: Responses6
}

export interface Responses6 {
    default: Default2
}

export interface Default2 {
    description: string
    content: Content2
}

export interface Content2 {
    "application/json": ApplicationJson2
}

export interface ApplicationJson2 {
    schema: Schema3
}

export interface Schema3 {
    type: string
    properties: Properties2
}

export interface Properties2 {
    status: Status
}

export interface Status {
    type: string
}

export interface OllamaQuery {
    post: Post3
}

export interface Post3 {
    operationId: string
    parameters: any[]
    requestBody: RequestBody
    responses: Responses7
    tags: string[]
}

export interface RequestBody {
    required: boolean
    content: Content3
}

export interface Content3 {
    "application/json": ApplicationJson3
}

export interface ApplicationJson3 {
    schema: Schema4
}

export interface Schema4 {
    type: string
    properties: Properties3
    required: string[]
}

export interface Properties3 {
    model: Model
    query: Query
}

export interface Model {
    type: string
}

export interface Query {
    type: string
}

export interface Responses7 {
    "201": N2013
}

export interface N2013 {
    description: string
}

export interface OllamaModels {
    get: Get5
}

export interface Get5 {
    operationId: string
    parameters: any[]
    responses: Responses8
    tags: string[]
}

export interface Responses8 {
    default: Default3
}

export interface Default3 {
    description: string
    content: Content4
}

export interface Content4 {
    "application/json": ApplicationJson4
}

export interface ApplicationJson4 {
    schema: Schema5
}

export interface Schema5 {
    type: string
    properties: Properties4
}

export interface Properties4 {
    models: Models
}

export interface Models {
    type: string
    items: Items
}

export interface Items {
    type: string
    properties: Properties5
}

export interface Properties5 {
    name: Name
    model: Model2
    modified_at: ModifiedAt
    size: Size
    digest: Digest
    details: Details
}

export interface Name {
    type: string
}

export interface Model2 {
    type: string
}

export interface ModifiedAt {
    type: string
    format: string
}

export interface Size {
    type: string
}

export interface Digest {
    type: string
}

export interface Details {
    type: string
    properties: Properties6
}

export interface Properties6 {
    parent_model: ParentModel
    format: Format
    family: Family
    families: Families
    parameter_size: ParameterSize
    quantization_level: QuantizationLevel
}

export interface ParentModel {
    type: string
}

export interface Format {
    type: string
}

export interface Family {
    type: string
}

export interface Families {
    type: string
    items: Items2
}

export interface Items2 {
    type: string
}

export interface ParameterSize {
    type: string
}

export interface QuantizationLevel {
    type: string
}

export interface Info {
    title: string
    description: string
    version: string
    contact: Contact
}

export interface Contact {}

export interface Tag {
    name: string
    description: string
}

export interface Components {
    schemas: Schemas
}

export interface Schemas {}
