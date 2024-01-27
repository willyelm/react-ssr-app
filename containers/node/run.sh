cd /usr/src/app

echo "ENV: $ENV";

npm ci

if [ "$ENV" = "development" ]
  then
    echo "Development mode"
    npm run dev
  else
    echo "Production mode"
    npm run build
    npm start
fi
