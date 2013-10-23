function parse_post(element) {
	// console.log(element);
	var post = new Object();
	post.title = $(element).find("title").text();
	post.tag = post.title.split('[')[1].split(']')[0];
	post.title = post.title.split('[')[0];
	post.id = $(element).find("guid").text();
	post.url = $(element).find('link').text();
	post.description = $("<div/>").html($(element).find("description")).text();
	post.img = $('img', post.description)[0].src; //107x60px
	var shorten = 120;
	if (post.title.length > 80) {
		shorten = 70;
	}
	post.description = $.trim($(post.description).text());
	post.description = post.description.substr(0, shorten);
	// console.log(post);
	return post;
}

function open_item(url) {
	chrome.tabs.create({url: url});
	chrome.browserAction.setBadgeText({text:''});
}
