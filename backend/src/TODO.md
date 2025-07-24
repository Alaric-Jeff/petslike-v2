# Backend TODO List

## Security
- [ ] Integrate @fastify/helmet for secure HTTP headers
- [ ] Integrate @fastify/cors with strict origin policies
- [ ] Add rate limiting with @fastify/rate-limit
- [ ] Implement authentication and authorization (JWT, OAuth, etc.)
- [ ] Sanitize and validate all user inputs
- [ ] Regularly audit dependencies for vulnerabilities

## Testing & Quality
- [ ] Add comprehensive unit and integration tests for all services and controllers
- [ ] Set up CI/CD pipeline for automated testing and deployment
- [ ] Monitor and alert on error rates and performance metrics

## Performance Optimization
- [ ] Profile and optimize slow endpoints and code paths
- [ ] Tune PostgreSQL connection pool settings for optimal throughput
- [ ] Optimize all database queries (indexes, query plans, batching)
- [ ] Implement Node.js clustering to utilize all CPU cores smartly (e.g., sticky sessions if needed)
- [ ] Benchmark current req/sec using autocannon or similar tools
- [ ] Optionally add Redis caching for read-heavy endpoints as a performance boost

## Architecture & Migration
- [ ] Identify clear service boundaries for future microservices (Products, Users, Orders, Payments, etc.)
- [ ] Refactor code to ensure each module is self-contained and has minimal dependencies
- [ ] Prepare for microservice extraction by documenting APIs and data contracts
- [ ] Research and plan for API Gateway or reverse proxy setup

## Documentation
- [ ] Document API endpoints and expected request/response formats
- [ ] Maintain migration and deployment guides
- [ ] Update README with performance philosophy, security practices, and benchmark results 