type ObjectID = string;

export interface ParticipantDTO {
  OrganisationId?: ObjectID;
  Status?: "Active" | "Pending" | "Withdrawn";
  OrganisationName?: string;
  CreatedOn: string;
  LegalEntityName?: string;
  CountryOfRegistration?: string;
  CompanyRegister?: string;
  Tag?: string;
  Size?: string;
  RegistrationNumber?: string;
  RegistrationId?: string;
  RegisteredName?: string;
  AddressLine1?: string;
  AddressLine2?: string;
  City?: string;
  Postcode?: string;
  Country: string;
  ParentOrganisationReference?: string;
  AuthorisationServers?: AuthorisationServer[];
  OrgDomainClaims?: OrganisationAuthorityDomainClaim[];
  OrgDomainRoleClaims?: OrganisationAuthorityClaim[];
}

interface AuthorisationServer {
  AuthorisationServerId?: string;
  OrganisationId?: ObjectID;
  AutoRegistrationSupported?: boolean;
  SupportsCiba?: boolean;
  SupportsDCR?: boolean;
  ApiResources?: ApiResource[];
  AuthorisationServerCertifications?: AuthorisationServerCertification[];
  CustomerFriendlyDescription?: string;
  CustomerFriendlyLogoUri?: string;
  CustomerFriendlyName?: string;
  DeveloperPortalUri?: string;
  TermsOfServiceUri?: string;
  OpenIDDiscoveryDocument?: string;
  Issuer?: string;
  PayloadSigningCertLocationUri?: string;
  ParentAuthorisationServerId?: string;
}

interface ApiResource {
  ApiResourceId?: string;
  ApiVersion?: string;
  ApiDiscoveryEndpoints?: ApiDiscoveryEndpoint[];
  FamilyComplete?: boolean;
  ApiCertificationUri?: string;
  CertificationStatus?:
    | "Awaiting Certification"
    | "Certified"
    | "Deprecated"
    | "Rejected"
    | "Self-Certified";
  CertificationStartDate?: string;
  CertificationExpirationDate?: string;
  ApiFamilyType?: string;
}

interface ApiDiscoveryEndpoint {
  ApiDiscoveryId?: string;
  ApiEndpoint?: string;
}

interface AuthorisationServerCertification {
  CertificationStartDate?: string;
  CertificationExpirationDate?: string;
  CertificationId?: string;
  AuthorisationServerId?: string;
  Status?:
    | "Awaiting Certification"
    | "Certified"
    | "Deprecated"
    | "Rejected"
    | "Self-Certified";
  ProfileVariant?:
    | CertificationCibaEnum
    | CertificationRedirectEnum
    | CertificationDCREnum;
  ProfileVersion?: number;
  CertificationURI?: string;
}

/** The type of redirect certifications */
enum CertificationRedirectEnum {
  FAPIAdvOPWMTLS = "FAPI Adv. OP w/ MTLS",
  FAPIAdvOPWMTLSPAR = "FAPI Adv. OP w/ MTLS, PAR",
  FAPIAdvOPWPrivateKey = "FAPI Adv. OP w/ Private Key",
  FAPIAdvOPWPrivateKeyPAR = "FAPI Adv. OP w/ Private Key, PAR",
}

/** The type of ciba certification */
enum CertificationCibaEnum {
  FAPICIBAOPPollWMTLS = "FAPI-CIBA OP poll w/ MTLS",
  FAPICIBAOPPollWPrivateKey = "FAPI-CIBA OP poll w/ Private Key",
  FAPICIBAOPPingWMTLS = "FAPI-CIBA OP Ping w/ MTLS",
  FAPICIBAOPPingWPrivateKey = "FAPI-CIBA OP Ping w/ Private Key",
}

/** The type of DCR certification */
enum CertificationDCREnum {
  DCRSignedPayloadJWT = "DCR Signed payload - JWT",
  DCRUnsignedPayloadJSON = "DCR Unsigned payload- JSON",
}

interface OrganisationAuthorityDomainClaim {
  OrganisationAuthorityDomainClaimId?: string;
  AuthorisationDomainName?: string;
  AuthorityId?: string;
  AuthorityName?: string;
  RegistrationId?: string;
  Status?: "Active" | "Inactive";
}

interface OrganisationAuthorityClaim {
  OrganisationId?: ObjectID;
  OrganisationAuthorityClaimId?: string;
  AuthorityId?: string;
  Status?: "Active" | "Inactive";
  AuthorisationDomain?: string;
  Role?: string;
  Authorisations?: {
    Status?: "Active" | "Inactive";
    MemberState?: string;
  }[];
  RegistrationId?: string;
}
