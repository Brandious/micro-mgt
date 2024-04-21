#!/bin/bash

for i in {1..30}
do
   curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlNTNjZGFlYi05ZDE2LTQ3YzgtOGI0OS03ZmIzN2YxMjE3OTIiLCJpZCI6ImU1M2NkYWViLTlkMTYtNDdjOC04YjQ5LTdmYjM3ZjEyMTc5MiIsInVzZXJuYW1lIjoibWFuYWdlcjMiLCJlbWFpbCI6Im1hbmFnZXIzQGRlbW8uY29tIiwiYWNjZXNzVG9rZW4iOiJ6IiwicmVmcmVzaFRva2VuIjpudWxsLCJkZXBhcnRtZW50IjpudWxsLCJsb2NhdGlvbiI6bnVsbCwicm9sZXMiOlsibWFuYWdlciJdLCJpYXQiOjE3MTM2MTc3NTMsImV4cCI6MTcxMzcwNDE1M30.WRLsjrAv34Tj7l2iaG0eShVkGwSAKFVidqdDlicOOgI" -d '{
    "username": "manager'$i'",
    "password": "manager'$i'",
    "email": "manager'$i'@demo.com",
    "role": ["manager"]
}' http://localhost:3000/auth/signup
done
