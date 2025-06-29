import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const SERVER = {
  PORT: 3000,
  API_DOCS_PATH: 'api-docs',
} as const;

export const API_INFO = {
  TITLE: 'NestJS Authentication API',
  VERSION: '1.0.0',
  DESCRIPTION: `A comprehensive NestJS authentication API with PostgreSQL & Prisma.

## Features
- JWT Authentication with Access & Refresh tokens
- Google OAuth2 integration
- Local authentication (email/password)
- Cookie-based token storage
- Protected routes with guards

## Authentication
This API uses JWT tokens stored in HTTP-only cookies for authentication.

### Local Authentication
1. Create user account via POST /users
2. Login via POST /auth/login
3. Access protected routes (tokens automatically included via cookies)
4. Refresh tokens via POST /auth/refresh

### Google OAuth
1. Initiate OAuth flow via GET /auth/google
2. Handle callback via GET /auth/google/callback
3. User will be redirected to configured frontend URL

## Guards & Strategies
- **LocalAuthGuard**: For email/password login
- **JwtAuthGuard**: For protecting routes requiring authentication
- **JwtRefreshAuthGuard**: For refresh token validation
- **GoogleAuthGuard**: For Google OAuth flow`,
} as const;

export const SWAGGER_TAGS = {
  AUTHENTICATION: {
    name: 'Authentication',
    description: 'Authentication and authorization endpoints',
  },
  USERS: {
    name: 'Users',
    description: 'User management endpoints',
  },
} as const;

export const COOKIE_AUTH = {
  AUTHENTICATION: {
    name: 'Authentication',
    config: {
      type: 'http' as const,
      in: 'cookie' as const,
      scheme: 'bearer' as const,
      bearerFormat: 'JWT',
      description: 'JWT access token stored in HTTP-only cookie',
    },
  },
  REFRESH: {
    name: 'Refresh',
    config: {
      type: 'http' as const,
      in: 'cookie' as const,
      scheme: 'bearer' as const,
      bearerFormat: 'JWT',
      description: 'JWT refresh token stored in HTTP-only cookie',
    },
  },
} as const;

export const SWAGGER_OPTIONS = {
  swaggerOptions: {
    persistAuthorization: true,
    docExpansion: 'none',
    filter: true,
    showRequestDuration: true,
  },
} as const;

export const CONSOLE_MESSAGES = {
  SEPARATOR:
    '\no==o==o==o==o==o==o==o==o==o==o==o==o==o==o==o==o==o==o==o==o==o==o==o==o==o\n',
  APP_NAME: '🚀  NestJS Authentication API',
  VERSION_LABEL: 'Version    : 1.0.0',
  DESCRIPTION_LABEL:
    'Description: A comprehensive NestJS authentication API with PostgreSQL & Prisma',
  STATUS_BOX: {
    TOP: '  ┌─ 🚀 SERVER STATUS ────────────────────────────────────────────────────┐',
    EMPTY:
      '  │                                                                       │',
    SERVER_RUNNING: (port: number) =>
      `  │  ✅ Server running on: http://localhost:${port}                          │`,
    API_DOCS: (port: number, path: string) =>
      `  │  📚 API Documentation: http://localhost:${port}/${path}                 │`,
    BOTTOM:
      '  └───────────────────────────────────────────────────────────────────────┘',
  },
  READY_MESSAGE: `  💡 Server is ready to start! Please check the documentation at /${SERVER.API_DOCS_PATH}`,
  FOOTER:
    '\no==o==o==o==o==o==o==o==o==o==o==o==o==o==o==o==o==o==o==o==o==o==o==o==o==o\n',
} as const;

/**
 * Configure Swagger documentation
 */
export function configureSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle(API_INFO.TITLE)
    .setDescription(API_INFO.DESCRIPTION)
    .setVersion(API_INFO.VERSION)
    .addTag(
      SWAGGER_TAGS.AUTHENTICATION.name,
      SWAGGER_TAGS.AUTHENTICATION.description,
    )
    .addTag(SWAGGER_TAGS.USERS.name, SWAGGER_TAGS.USERS.description)
    .addCookieAuth(
      COOKIE_AUTH.AUTHENTICATION.name,
      COOKIE_AUTH.AUTHENTICATION.config,
    )
    .addCookieAuth(COOKIE_AUTH.REFRESH.name, COOKIE_AUTH.REFRESH.config)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(SERVER.API_DOCS_PATH, app, document, SWAGGER_OPTIONS);
}

/**
 * Start the server and display startup messages
 */
export async function startServer(app: INestApplication): Promise<void> {
  await app.listen(SERVER.PORT);

  // Display startup messages
  console.log(CONSOLE_MESSAGES.SEPARATOR);
  console.log(CONSOLE_MESSAGES.APP_NAME);
  console.log(CONSOLE_MESSAGES.VERSION_LABEL);
  console.log(CONSOLE_MESSAGES.DESCRIPTION_LABEL);
  console.log('\n');
  console.log(CONSOLE_MESSAGES.STATUS_BOX.TOP);
  console.log(CONSOLE_MESSAGES.STATUS_BOX.EMPTY);
  console.log(CONSOLE_MESSAGES.STATUS_BOX.SERVER_RUNNING(SERVER.PORT));
  console.log(
    CONSOLE_MESSAGES.STATUS_BOX.API_DOCS(SERVER.PORT, SERVER.API_DOCS_PATH),
  );
  console.log(CONSOLE_MESSAGES.STATUS_BOX.EMPTY);
  console.log(CONSOLE_MESSAGES.STATUS_BOX.BOTTOM);
  console.log('\n');
  console.log(CONSOLE_MESSAGES.READY_MESSAGE);
  console.log(CONSOLE_MESSAGES.FOOTER);
}
