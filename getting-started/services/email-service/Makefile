local:
	sls invoke local --function send -p send-email-data.json
# 	sls invoke local --function send

.PHONY: local

deploy:
	sls deploy
.PHONY: deploy

deployFN:
	sls deploy function --function ${FN}
.PHONY: deployFN

remove:
	sls remove
.PHONY: remove
