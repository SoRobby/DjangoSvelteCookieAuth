# Backend

## Known issues

### Pylance call expression not allowed in type expression
This is a known issue that has since been closed, the recommended closure is in Visual Studio Code (VSC) add the following setting:

```
"python.analysis.diagnosticSeverityOverrides": {
    "reportInvalidTypeForm": "none"
}
```

Reference: https://github.com/microsoft/pylance-release/issues/5457



## URL Patterns
### Authentication

| Name | Method | URL | Payload | Description |
|----|----|----|----|---|
| Test| asdf

- Register: POST `/auth/register`
- Validate email: GET `/auth/register/validate-email`
- Validate username: GET `/auth/register/validate-username`


Login: POST `/auth/login`
Logout: POST `/auth/logout`

Verify email: POST `/auth/email/verify`
Resend verification email: POST `/auth/email/resend-verification`




