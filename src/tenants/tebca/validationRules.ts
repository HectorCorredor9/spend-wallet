import * as yup from 'yup';
//Internal app
import { regularExpressions } from './regex';
import { ValidationRule } from '@/interfaces';

const validatePasswordStrength = (value: string | undefined): boolean => {
  if (!value) return false;
  const hasUpperCase = /[A-Z]/.test(value);
  const hasLowerCase = /[a-z]/.test(value);
  const hasNumber = /[0-9]/.test(value);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);
  return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
};

const passwordValidation = yup
  .string()
  .required('password_required')
  .min(8, 'password_min')
  .max(50, 'password_max')
  .test('password-strength', 'password_weak', (value) => validatePasswordStrength(value));

export const validationRules: ValidationRule = {
  password: yup.string().required('password_required').min(8, 'password_min').max(50, 'password_max'),
  newPassword: passwordValidation,
  currentNewPassword: yup
    .string()
    .required('currentNewPassword_required')
    .oneOf([yup.ref('newPassword')], 'currentNewPassword_match'),
  email: yup
    .string()
    .email('email_invalid')
    .required('email_required')
    .min(7, 'email_invalid')
    .test('emailValid', 'email_invalid', (value) => regularExpressions.emailValid?.test(value)),
  otp: yup
    .string()
    .required('otp_required')
    .min(6, 'otp_max')
    .test('otpValid', 'otp_number', (value) => regularExpressions.numeric?.test(value)),
  confirmationCode: yup
    .string()
    .required('otp_required')
    .min(6, 'otp_required')
    .max(6, 'otp_required')
    .test('confirmationCodeValid', 'otp_number', (value) => regularExpressions.numeric?.test(value)),
  dni: yup
    .string()
    .required('dni_required')
    .min(7, 'dni_min')
    .max(11, 'dni_max')
    .test('dniValid', 'dni_invalid', (value) => regularExpressions.numeric?.test(value)),
  cardNumber: yup
    .string()
    .required('cardNumber_required')
    .min(13, 'cardNumber_min')
    .max(19, 'cardNumber_max')
    .test('cardNumberValid', 'cardNumber_invalid', (value) => regularExpressions.numeric?.test(value)),
  pin: yup
    .string()
    .required('pin_required')
    .min(4, 'pin_min')
    .max(4, 'pin_max')
    .test('pinValid', 'pin_invalid', (value) => regularExpressions.numeric?.test(value)),
  newPin: yup.string().required('newPin_required').min(4, 'newPin_min').max(4, 'newPin_max'),
  currentNewPin: yup
    .string()
    .required('currentNewPin_required')
    .min(4, 'currentNewPin_min')
    .max(4, 'currentNewPin_max')
    .oneOf([yup.ref('newPin')], 'currentNewPin_match'),
  firstName: yup.string().required('firstName_required').min(2, 'firstName_min').max(50, 'firstName_max'),
  middleName: yup.string().max(50, 'middleName_max'),
  lastName: yup.string().required('lastName_required').min(2, 'lastName_min').max(50, 'lastName_max'),
  surName: yup.string().max(50, 'surName_max'),
  birthDate: yup.date().required('birthDate_required').max(new Date(), 'birthDate_future'),
  gender: yup
    .string()
    .required('gender_required')
    .test('gender-valid', 'gender_invalid', (value) => {
      if (!value) return false;
      return ['male', 'female', 'other'].includes(value);
    }),
  idType: yup
    .string()
    .required('idType_required')
    .test('idType-valid', 'idType_invalid', (value) => {
      if (!value) return false;
      return ['dni', 'passport', 'other'].includes(value);
    }),
  idNumber: yup.string().required('idNumber_required').min(7, 'idNumber_min').max(20, 'idNumber_max'),
  phoneNumber: yup
    .string()
    .required('phoneNumber_required')
    .min(8, 'phoneNumber_min')
    .max(17, 'phoneNumber_max')
    .test('phoneNumberValid', 'phoneNumber_invalid', (value) => regularExpressions.numeric?.test(value)),
  address: yup.string().required('address_required').min(5, 'address_min').max(200, 'address_max'),
  city: yup.string().required('city_required').min(2, 'city_min').max(100, 'city_max'),
  state: yup.string().required('state_required').min(2, 'state_min').max(100, 'state_max'),
  district: yup.string().required('district_required').min(2, 'district_min').max(100, 'district_max'),
  nationality: yup.string().required('nationality_required').min(2, 'nationality_min').max(100, 'nationality_max'),
  birthPlace: yup.string().required('birthPlace_required').min(2, 'birthPlace_min').max(100, 'birthPlace_max'),
  civilStatus: yup
    .string()
    .required('civilStatus_required')
    .test('civilStatus-valid', 'civilStatus_invalid', (value) => {
      if (!value) return false;
      return ['single', 'married', 'divorced', 'widowed', 'other'].includes(value);
    }),
  postalCode: yup
    .string()
    .required('postalCode_required')
    .min(4, 'postalCode_min')
    .max(10, 'postalCode_max')
    .test('postalCodeValid', 'postalCode_invalid', (value) => regularExpressions.numeric?.test(value)),
  employed: yup
    .string()
    .required('employed_required')
    .test('employed-valid', 'employed_invalid', (value) => {
      if (!value) return false;
      return ['employed', 'unemployed', 'self-employed', 'retired', 'other'].includes(value);
    }),
  profession: yup.string().required('profession_required').min(2, 'profession_min').max(100, 'profession_max'),
  position: yup.string().required('position_required').min(2, 'position_min').max(100, 'position_max'),
  averageIncome: yup
    .string()
    .required('averageIncome_required')
    .test('averageIncomeValid', 'averageIncome_invalid', (value) => regularExpressions.amountValid?.test(value)),
  publicOfficeOld: yup
    .string()
    .required('publicOfficeOld_required')
    .test('publicOfficeOld-valid', 'publicOfficeOld_invalid', (value) => {
      if (!value) return false;
      return ['true', 'false'].includes(value);
    }),
  publicInst: yup.string().max(200, 'publicInst_max'),
  taxesObligated: yup
    .string()
    .required('taxesObligated_required')
    .test('taxesObligated-valid', 'taxesObligated_invalid', (value) => {
      if (!value) return false;
      return ['true', 'false'].includes(value);
    }),
  nickName: yup.string().required('nickName_required').min(3, 'nickName_min').max(30, 'nickName_max'),
  newPass: passwordValidation,
  confirmPass: yup
    .string()
    .required('confirmPass_required')
    .oneOf([yup.ref('newPass')], 'confirmPass_match'),
  currentPassword: yup.string().required('currentPassword_required').min(8, 'currentPassword_min'),
};
