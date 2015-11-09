# New to Vagrant? Read: https://github.com/dwyl/learn-vagrant
# This script creates a VM with Ubuntu, Node.js, Java & ElasticSearch
$script = <<SCRIPT

# https://xkcd.com/149/ (its "ok" in a VM...)
sudo -i

# update ubuntu (security etc.)
apt-get update

# apt-get -y install g++ git git-core

# OpenJDK Java runtime http://packages.ubuntu.com/precise/openjdk-7-jre-headless
apt-get install openjdk-7-jre-headless -y

### Check http://www.elasticsearch.org/download/ for latest version of ElasticSearch and replace wget link below

wget https://download.elasticsearch.org/elasticsearch/elasticsearch/elasticsearch-1.7.2.deb
sudo dpkg -i elasticsearch-1.7.2.deb

curl -L http://github.com/elasticsearch/elasticsearch-servicewrapper/tarball/master | tar -xz
mkdir -p /usr/local/share/elasticsearch/bin/
mv *servicewrapper*/service /usr/local/share/elasticsearch/bin/
rm -Rf *servicewrapper*

/usr/local/share/elasticsearch/bin/service/elasticsearch install
ln -s `readlink -f /usr/local/share/elasticsearch/bin/service/elasticsearch` /usr/local/bin/rcelasticsearch

service elasticsearch start
# wait for ElasticSearch to boot
sleep 10
# Test that the sever is working
curl http://localhost:9200

SCRIPT

Vagrant.configure("2") do |config|

  # config.vm.box = "base"
  config.vm.box = "ubuntu-elasticsearch-server"
  config.vm.box_url = "https://cloud-images.ubuntu.com/vagrant/trusty/current/trusty-server-cloudimg-amd64-vagrant-disk1.box"

  config.vm.network :forwarded_port, guest: 9200, host: 9200
  config.vm.network :forwarded_port, guest: 9300, host: 9300
  # Create a private network, which allows host-only access to the machine
  # using a specific IP.
  config.vm.network :private_network, ip: "192.168.33.10"
  config.vm.provision :shell, :inline => $script

end
