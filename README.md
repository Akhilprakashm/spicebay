# SpiceBay — Cloud-Native E-Commerce on AWS

> A fully containerized e-commerce platform built and deployed on AWS using modern DevOps practices — Infrastructure as Code, CI/CD automation, and cloud-native observability.

## Project Overview

SpiceBay is a portfolio project that demonstrates end-to-end AWS DevOps skills — from writing infrastructure as code with Terraform to automating deployments through a GitHub Actions CI/CD pipeline.

## Architecture

| Layer | Technology |
|---|---|
| Frontend | React — hosted on S3 + CloudFront |
| Backend API | Python Flask — containerized with Docker |
| Container registry | Amazon ECR |
| Container orchestration | Amazon ECS Fargate |
| Load balancing | Application Load Balancer (ALB) |
| Database | Amazon RDS (PostgreSQL) |
| Caching | Amazon ElastiCache (Redis) |
| DNS | Amazon Route 53 |
| Infrastructure as Code | Terraform |
| CI/CD | GitHub Actions |
| Monitoring | Amazon CloudWatch + SNS alerts |

## Project Structure

spicebay/
- app/frontend — React storefront
- app/backend — Python Flask API
- infra/ — Terraform modules
- .github/workflows/ — CI/CD pipelines
- docs/ — Architecture diagrams

## Author

Akhil Prakash
GitHub: https://github.com/Akhilprakashm
