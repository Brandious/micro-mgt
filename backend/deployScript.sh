# Step 1: Build the Docker image
docker build -t backend:latest .

# Step 2: Tag the Docker image
docker tag backend:latest gcr.io/micromgt/backend:latest

# Step 3: Push the Docker image to GCR
gcloud auth configure-docker
docker push gcr.io/micromgt/backend:latest

# Step 4: Deploy the Docker image to Google Cloud Run
gcloud run deploy backend \
--image=gcr.io/micromgt/backend:latest \
--region=europe-central2 \
--project=micromgt \
 && gcloud run services update-traffic backend --to-latest
