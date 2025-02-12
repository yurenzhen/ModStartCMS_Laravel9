<?php

namespace Module\Site\Admin\Controller;

use Illuminate\Routing\Controller;
use ModStart\Admin\Layout\AdminConfigBuilder;
use Module\Vendor\Provider\SiteTemplate\SiteTemplateProvider;

class ConfigController extends Controller
{
    public function setting(AdminConfigBuilder $builder)
    {
        $builder->pageTitle('基本设置');

        $builder->layoutSeparator('网站信息');
        $builder->image('siteLogo', '网站Logo');
        $builder->text('siteName', '网站名称');
        $builder->text('siteSlogan', '网站副标题');
        $builder->text('siteDomain', '网站域名');
        $builder->text('siteKeywords', '网站关键词');
        $builder->textarea('siteDescription', '网站描述');
        $builder->image('siteFavIco', '网站ICO');

        $builder->layoutSeparator('模板主题');
        $builder->color('sitePrimaryColor', '网站主色调');
        $builder->select('siteTemplate', '网站模板')->options(SiteTemplateProvider::map());

        $builder->layoutSeparator('备案信息');
        $builder->text('siteBeian', 'ICP备案编号');
        $builder->text('siteBeianGonganText', '公安备案文字');
        $builder->text('siteBeianGonganLink', '公安备案链接');

        $builder->formClass('wide');
        return $builder->perform();
    }

}
