//
//  ViewController.m
//  InsertRNTest
//
//  Created by leven on 2017/3/25.
//  Copyright © 2017年 leven. All rights reserved.
//

#import "ViewController.h"
#import <RCTRootView.h>
@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
    self.title = @"RNVC";
}
- (IBAction)btnClick:(id)sender {
    NSURL *jsonCodeLocation = [NSURL URLWithString:@"http://localhost:8081/LWListView.bundle?platform=ios"];
    RCTRootView *rootView = [[RCTRootView alloc]initWithBundleURL:jsonCodeLocation moduleName:@"RNTest" initialProperties:nil launchOptions:nil];
    UIViewController *vc = [[UIViewController alloc]init];
    vc.view = rootView;
    vc.title = @"RN";
    [self.navigationController pushViewController:vc animated:YES];
    
}


- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}


@end
