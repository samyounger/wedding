echo "Building site"
jekyll build


echo "Removing the .html extension from all html files, for S3 routing urls without the .html extension"
export DEPLOY_DIR="_site"

for filename in $DEPLOY_DIR/*.html; do
  if [ $filename != "$DEPLOY_DIR/index.html" ] && [ $filename != "$DEPLOY_DIR/404.html" ] ;
  then
    original="$filename"

    # Get the filename without the path/extension
    filename=$(basename "$filename")
    extension="${filename##*.}"
    filename="${filename%.*}"

    # Move it
    mv $original $DEPLOY_DIR/$filename
  fi
done

echo "Deploying site to s3"
s3_website push
