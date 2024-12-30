import { UUID } from 'crypto';


export enum UserRole {
    ADMIN = "Quản trị viên",
    SYS_ADMIN = "Quản trị viên hệ thống",
    EXAM_ADMIN = "Quản trị viên đề thi",
    STUDENT = "Học viên",
    PAID_USER = "Người dùng có trả phí",
    NONPAID_USER = "Người dùng không trả phí"
}

export enum InvitationStatus {
    PENDING = "Chưa phản hồi",
    ACCEPT = "Chấp nhận",
    DECLINE = "Từ chối"
}

// Quiz Interface

export enum QuizType {
    MULTIPLE_CHOICE = 'MULTIPLE CHOICE',
    FILLING = 'FILLING'
}

export enum Skill {
    READING = 'READING',
    LISTENING = 'LISTENING',
    WRITING = 'WRITING',
    SPEAKING = 'SPEAKING',
};

export enum Category {
    THPTQG = 'THPTQG',
    IELTS = 'IELTS',
    HSK = 'HSK'
}

export enum FetchingType {
    FULL = "full",
    AUTO = "auto" 
}

export enum RecordFetchingType {
    FULL = "full",
    DEFAULT = "default"
}


export enum SplitType {
    QUIZ_LEVEL = 'QUIZ_LEVEL',
    GROUP_LEVEL = 'GROUP_LEVEL'
}

export enum OtpPurpose {
    CREATE_ACCOUNT = 'CREATE_ACCOUNT',
    RESET_PASSWORD = 'RESET_PASSWORD'
}

export enum LangVersion {
    en = 'en',
    vi = 'vi'
}
export interface SignUpPayload {
    name: string;
    email: string;
    password: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RefreshToken {
    refreshToken: string;
}

export interface VerifyOtpPayload {
    id: UUID;
    otp: string; // 6 numeric digits
}

export interface ResendOTPPayload {
    id?: UUID; // use for 'CREATE_ACCOUNT'
    email?: string; // use for "RESET_PASSWORD"
    purpose: OtpPurpose;
}


export interface VerifyOtpForResetPasswordPayload {
    email: string;
    otp: string; // 6 numeric digits
}

export interface SearchCriteria {
    field: string;
    operator: '~' | '!~' | '=' | '!=' | 'isSet' | 'isNotSet' | '<' | '<=' | '>' | '>=';
    value?: any;
}

export interface SearchAddition {
    sort?: [string, 'ASC' | 'DESC'][],
    page?: number,
    size?: number,
    group?: string[]
}

export interface SearchPayload {
    criteria: SearchCriteria[],
    addition: SearchAddition
}

export interface EmailResetPassword {
    email: string;
}

export interface CheckExistAccount {
    email: string;
}

export interface UpdateAccountPayload {
    username?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    dateOfBirth?: Date;
    roles?: UserRole[]; // Just ADMIN, SYS_ADMIN allowed
}

export interface UpdateAvatarPayload {
    avatar: File;
}


export interface CreateFillingQuiz {
    description: string;
    answer: string[];
    explaination: string;
}

export interface CreateFillingGroup {
    type: QuizType;
    question: String;
	startFrom: Number;
    quizzes: CreateFillingQuiz[];
    quizId: string;
}

export interface UpdateFillingQuiz {
    id?: UUID;
    description?: string;
    answer?: string[];
    explaination?: string;
}

export interface UpdateFillingGroup {
    id?: UUID;
    type?: QuizType;
    question?: String;
	startFrom?: Number;
    quizzes?: UpdateFillingQuiz[];
}


export interface CreateMultipleChoiceQuiz {
    description: string;
    options: string[]; 
    answer: string[];
    // numOfAnswers: number;
    explaination: string;
}
export interface CreateMultipleChoiceGroup {
    type: QuizType;
    question: String;
	startFrom: Number;
    quizzes: CreateMultipleChoiceQuiz[];
    quizId: string;
}

export interface UpdateMultipleChoiceGroup {
    id?: UUID;
    type?: QuizType;
    question?: String;
	startFrom?: Number;
    quizzes?: UpdateMultipleChoiceQuiz[];
}

export interface UpdateMultipleChoiceQuiz {
    id?: UUID;
    description?: string;
    options?: string[]; 
    answer?: string[];
    // numOfAnswers?: number;
    explaination?: string;
}

export interface UpdateQuiz {
    id?: UUID;
    content?: string;
    skill?: Skill;
    category?: Category;
    tagIds?: UUID[];
    script?: string;
    groups?: (UpdateMultipleChoiceGroup | UpdateFillingGroup)[];
    order?: UUID[];
    weight?: number;
    isFileUpdated?: boolean;
}

export interface UpdateQuizStatistics {
    readingCount: number;
    listeningCount: number;
    writingCount: number;
    speakingCount: number;
    multipleChoiceCount: number;
    fillingCount: number;
}

export interface CreateFullQuiz {
    file: File;
    data: CreateQuiz
}

export interface CreateProduct {
    Name: string;                   
    MakeFlag: boolean;               
    FinishedGoodsFlag: boolean;     
    Color: string;                   
    SafetyStockLevel: number;       
    ReorderPoint: number;           
    StandardCost: number;         
    ListPrice: number;              
    Size: string;                    
    SizeUnitMeasureCode: string;     
    WeightUnitMeasureCode: string;   
    Weight: number;                  
    DaysToManufacture: number;       
    ProductLine?: 'R' | 'M' | 'T' | 'S'; 
    Class?: 'H' | 'M' | 'L';
    Style?: 'U' | 'M' | 'W';
    ProductSubcategoryID?: number;
    ProductModelID?: number; 
    SellStartDate: Date;
    SellEndDate?: Date; 
    DiscontinuedDate?: Date;  
    ModifiedDate: Date;
}


export interface UpdateFullQuiz {
    file: File;
    data: UpdateQuiz
}

export interface CreateQuiz {
    content: string;
    category: Category;
    tagIds: UUID[];
    script: string;
    skill: Skill;
    weight?: number;
    groups: (CreateMultipleChoiceGroup | CreateFillingGroup )[];
}

export interface CreateTestFromQuizIds {
    name: string;
    reading: UUID[];
    listening: UUID[];
    writing: UUID[];
    speaking: UUID[];
    readingAmount: number;
    listeningAmount: number;
    writingAmount: number;
    speakingAmount: number;
}

// Test interface

/**
 * Mỗi phần tử là 1 quizId
*/

export interface CreateFullPracticeFromTest {
    files: File[];
    data: CreatePracticeFromTest;
}

export interface CreatePracticeFromTest {
    testId: UUID;
    quizId: UUID;
    groupId: UUID;
    test: CreateTest;
}


export interface CreateTest {
    name: string;
    skill: Skill;
    reading: CreateQuiz[];
    listening: CreateQuiz[];
    writing: CreateQuiz[];
    speaking: CreateQuiz[];
    hasPublished: Boolean;
    isPractice: Boolean;
    readingAmount: number; //if dont set, use null (readingAmount: null)
    listeningAmount: number;
    writingAmount: number;
    speakingAmount: number;
}

export interface CreateFullTest {
    files: File[]; //listening file in order
    data: CreateTest;  
}

export interface UpdateFullTest {
    files: File[];
    data: UpdateTest
}

export interface UpdateTest {
    name?: string;
    skill?: Skill;
    reading?: UpdateQuiz[];
    listening?: UpdateQuiz[];
    writing?: UpdateQuiz[];
    speaking?: UpdateQuiz[];
    hasPublished?: Boolean;
    readingAmount?: number;
    listeningAmount?: number;
    writingAmount?: number;
    speakingAmount?: number;
}


// Record Interface

/**
 * Id là quizId
 * Từ quizId tìm ra bài quiz rồi so khớp answer để tính điểm
 * duration là thời gian làm bài
 */
export interface Reading {
    id: string;
    answer: string[];
    duration: number;
}

export interface Listening {
    id: string;
    answer: string[];
    duration: number;
}

export interface Writing {
    id: string;
    answer: string;
    duration: number;
}

export interface Speaking {
    id: string;
    answer: File;
    duration: number;
}

export interface MultipleChoiceAnswer {
    id: UUID;
    answer: string[][];
}

export interface FillingAnswer {
    id: UUID;
    answer: string[];
}

export interface AnswerQuiz {
    id: UUID;
    answer: string[] | string;
}
export interface AnswerGroup {
    id: UUID;
    quizzes: AnswerQuiz[];
}

export interface CreateAnswer {
    recordId: UUID;
    score: number;
    multipleChoiceQuizId: UUID;
    fillingQuizId: UUID;
    content: string[] | string;
}

export interface WritingFiles {
    files: File[]; // only .txt and msword
}

export interface SpeakingFiles {
    files: File[]; // havenot implemented yet
}

export interface UpdateWritingAnswer {
    id: UUID;
    content: string;
}

export interface CreateRemarkRequest {
    writingAnswerId: UUID;
    accountId: UUID;
}

export interface RemarkWriting {
    remark: string;
    firstCriterion: string;
    secondCriterion: string;
    thirdCriterion: string;
    fourthCriterion: string;
    firstCriterionScore: number;
    secondCriterionScore: number;
    thirdCriterionScore: number;
    fourthCriterionScore: number;
}

export interface SearchRemarkRequest {
    id: UUID;
    writingAnswerId: UUID;
    accountId: UUID;
}
export interface CreateRecord {
    testId: UUID;

    readingDuration: number;
    listeningDuration: number;
    writingDuration: number;
    speakingDuration: number;
    completeReading: boolean;
    completeListening: boolean;
    completeWriting: boolean;
    completeSpeaking: boolean;
    reading: AnswerGroup[];
    listening: AnswerGroup[];
    writing: UpdateWritingAnswer[];
    speaking: AnswerGroup[];
}

export interface GetRecord {
    testId: string;
    accountId: string;
}

export interface UpdateRecord {
    testId: UUID;
    readingDuration?: number;
    listeningDuration?: number;
    writingDuration?: number;
    speakingDuration?: number;
    completeReading?: boolean;
    completeListening?: boolean;
    completeWriting?: boolean;
    completeSpeaking?: boolean;
    reading?: AnswerGroup[];
    listening?: AnswerGroup[];
    writing?: UpdateWritingAnswer[];
    speaking?: AnswerGroup[];
}

export interface UpdateFullRecord {
    writingFiles: File[]; // .txt or .doc
    speakingFiles: File[]; // no implement
    data: UpdateRecord;
}

export interface UpdateRecordConfig {
    readingAmount: number;
    listeningAmount: number;
    speakingAmount: number;
    writingAmount: number;
}


export interface InitRecord {
    testId: UUID;
    readingAmount: number;
    listeningAmount: number;
    speakingAmount: number;
    writingAmount: number;
}

// Tag interface
export interface CreateTag {
    value: string;
    skill: Skill;
    forQuiz: boolean;
}

export interface UpdateTag {
    value?: string;
    skill?: Skill;
    forQuiz?: boolean;
}

export interface CreateFTag {
    value: string;
    isPublic: boolean;
}

export interface UpdateFTag {
    value?: string;
}


//Flash card

export interface CreateFlashCard {
    word: string;
    definition: string;
    tagIds: UUID[];
    isPublic: boolean;
}

export interface CreateFullFlashCard {
    file: File; // illustration pic 'image/png', 'image/jpg', 'image/jpeg'
    data: CreateFlashCard;
}

export interface UpdateFullFlashCard {
    file: File; // illustration pic 'image/png', 'image/jpg', 'image/jpeg'
    data: UpdateFlashCard;
}

export interface BulkCreateFullFlashCard {
    files: File[]; // illustration pic 'image/png', 'image/jpg', 'image/jpeg'
    data: CreateFlashCard[];
}

// export interface GetFlashCard {
//     word?: string;
//     definition?: string;
//     isPublic?: boolean;
//     tag?: string;
// }

export interface UpdateFlashCard {
    word?: string;
    definition?: string;
    tagIds?: UUID[];
    isPublic?: boolean;
    isFileUpdated?: boolean;
}