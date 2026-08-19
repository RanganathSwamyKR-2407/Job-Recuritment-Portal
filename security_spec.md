# Security Architecture Specification: HireStream

## 1. Data Invariants
1. **Public Discovery Access**: Any visitor (authenticated or unauthenticated) can read and query active `/jobs/{jobId}` listings.
2. **Job Mutation Protection**: Only authenticated users can post or update job listings; job IDs and postedBy UID must be immutable.
3. **Application Confidentiality & Isolation**: Candidates may only create, read, and list applications where `userId == request.auth.uid`. A candidate cannot read another candidate's private application or PII.
4. **Saved Jobs Integrity**: Users can only read, write, and delete their own bookmarked jobs matching `userId == request.auth.uid`.
5. **User Profile Privacy**: Profile documents under `/user_profiles/{userId}` can only be read or written by the document owner (`request.auth.uid == userId`).
6. **Input & Size Limits**: Every incoming string and array must be bounded (e.g. title <= 200 chars, description <= 3000 chars, IDs matching alphanumeric patterns).

## 2. Dirty Dozen Threat Payloads (Must Return PERMISSION_DENIED)
1. **Payload 1: Unauthenticated Application Read**: Attacker attempts `get /applications/app-123` without auth token. Expected: DENIED.
2. **Payload 2: Cross-User Application Scraping**: User `alice_uid` attempts `list /applications` where `userId == 'bob_uid'`. Expected: DENIED.
3. **Payload 3: Identity Spoofing on Application Submit**: User `alice_uid` attempts to create an application with `userId: 'bob_uid'`. Expected: DENIED.
4. **Payload 4: Malicious Oversized Job Payload**: Attacker attempts to post a job with 500KB title. Expected: DENIED.
5. **Payload 5: Profile Hijacking**: Attacker attempts `write /user_profiles/victim_123` with their own auth token. Expected: DENIED.
6. **Payload 6: Ghost Field Injection on Job Update**: Attacker attempts to inject hidden admin fields into `/jobs/job-123`. Expected: DENIED.
7. **Payload 7: Invalid Path ID Poisoning**: Attacker sends path with characters `/jobs/..%2F..%2Fhack`. Expected: DENIED.
8. **Payload 8: Blanket User Profile Read**: User attempts unconstrained `list /user_profiles`. Expected: DENIED.
9. **Payload 9: Unauthenticated Bookmark Creation**: Anonymous request attempts `write /saved_jobs/user_123_job_1`. Expected: DENIED.
10. **Payload 10: Saved Job Theft**: User `alice` attempts `delete /saved_jobs/bob_job_1`. Expected: DENIED.
11. **Payload 11: Application Status Tampering**: Unauthenticated client attempts updating application status to 'Accepted'. Expected: DENIED.
12. **Payload 12: Root Wildcard Write**: Malicious script attempts writing directly to `/databases/{database}/documents/{doc=**}` root. Expected: DENIED.
